import { IOrder, IOrderItem } from '@/modules/ordenes/interfaces/IOrder';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/modules/ordenes/interfaces/IStockPerVariant';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IClient from '@/modules/cart/interfaces/IClient';
import { ORDERS_KEY, CLIENTS_KEY } from '@/modules/common/consts';
import { ICartItem } from '../interfaces/ICart';
import { adaptOrderItemToCartItem } from '@/modules/ordenes/utils/utils';

interface IMutateProps {
  order: IOrder<number>;
}
interface IProps {
  onSuccess: () => void;
}

export default function useUpdateOrderMutation({ onSuccess }: IProps) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ order }: IMutateProps) => {
      const resp = [null, null] as [any, any];

      console.log({ order });

      resp[0] = await strapi.update(ORDERS_KEY, order.id!, {
        ...order,
        client: order.client || undefined,
        id: undefined,
        items: order.items.map((item): IOrderItem<number, number> => {
          return {
            product: item.product!.id,
            quantity: item.quantity,
            price: item.selectedVariant.price,
            selectedVariant: item.selectedVariant.id!,
          };
        }),
        subtotalPrice: order.subtotalPrice,
        totalPrice: order.subtotalPrice,
      });
      if (order.client) {
        resp[1] = await strapi.update(CLIENTS_KEY, order.client!, {
          address: order.address,
        } as IClient);
      }
      // TODO:
      const excludeServiceItem = (item: IOrderItem): boolean =>
        !item.product!.isService;

      const itemsToUpdate = order.items
        .filter(excludeServiceItem)
        .map(adaptOrderItemToCartItem);

      if (itemsToUpdate.length) {
        resp[1] = await updateStock(itemsToUpdate);
      }

      queryClient.invalidateQueries([CLIENTS_KEY]);
      queryClient.invalidateQueries([ORDERS_KEY]);
      return {
        orderResponse: resp[0],
        stockResponse: resp[1],
      };
    },
    { onSuccess },
  );
}

async function updateStock(items: ICartItem[]) {
  const productIds = items.map((item) => item.product.id);

  const stockPerVariant = (await strapi.find('stock-per-variants', {
    filters: {
      variant: {
        product: {
          id: productIds,
        },
      },
    },
  })) as unknown as IStockPerVariantPages;

  console.log(stockPerVariant);
  const updatedStockPerVariant = stockPerVariant.results.map(
    (spv): Pick<IStockPerVariant, 'id' | 'stock'> => {
      const item = items.find((i) => spv.variant === i.selectedVariant.id);

      if (!item)
        return {
          id: spv.id,
          stock: spv.stock,
        };
      return {
        id: spv.id,
        stock: spv.stock - item.quantity,
      };
    },
  );

  const promises = updatedStockPerVariant.map(async (spv) => {
    const { id } = spv;

    return await strapi.update('stock-per-variants', id!, {
      stock: spv.stock,
    });
  });

  const result = await Promise.allSettled(promises);

  if (
    result.some((r) => {
      return r.status === 'rejected';
    })
  ) {
    throw new Error('Error al actualizar el stock');
  }
}

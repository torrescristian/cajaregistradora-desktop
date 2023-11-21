import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/modules/ordenes/interfaces/IStockPerVariant';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IClient from '@/modules/cart/interfaces/IClient';
import { ORDERS_KEY, CLIENTS_KEY } from '@/modules/common/consts';
import { ICartItem } from '../interfaces/ICart';

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
      resp[0] = await strapi.update(ORDERS_KEY, order.id!, order);
      if (order.client) {
        resp[1] = await strapi.update(CLIENTS_KEY, order.client!, {
          address: order.address,
        } as IClient);
      }

      queryClient.invalidateQueries([CLIENTS_KEY]);
      queryClient.invalidateQueries([ORDERS_KEY]);
      return resp;
    },
    { onSuccess },
  );
}

async function updateStock(items: ICartItem[]) {
  const productIds = items.map((item) => item.product.id);

  const stockPerVariant = (await strapi.find('stock-per-variants', {
    filters: {
      product: {
        id: productIds,
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

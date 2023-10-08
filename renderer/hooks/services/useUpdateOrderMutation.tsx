import { ICartItem } from '@/interfaces/ICart';
import { IOrder, IOrderItem } from '@/interfaces/IOrder';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/interfaces/IStockPerVariant';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';
import { getClientsQueryKey } from './useClientQuery';
import IClient from '@/interfaces/IClient';

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
      resp[0] = await strapi.update(getOrderQueryKey(), order.id!, order);
      if (order.client) {
        resp[1] = await strapi.update(getClientsQueryKey(), order.client!, {
          address: order.address,
        } as IClient);
      }
      // TODO:
      // const excludeServiceItem = (item: IOrderItem): boolean =>
      //   !item.product!.isService;

      // const itemsToUpdate = order.items.filter(excludeServiceItem);
      /* 
        if (itemsToUpdate.length) {
          resp[1] = await updateStock(itemsToUpdate);
        } */

      queryClient.invalidateQueries([getClientsQueryKey()]);
      queryClient.invalidateQueries([getOrderQueryKey()]);
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

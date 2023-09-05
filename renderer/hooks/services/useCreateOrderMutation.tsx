import { ICartItem } from '@/interfaces/ICart';
import { IOrder, IOrderItem, ORDER_STATUS } from '@/interfaces/IOrder';
import IStockPerVariant, {
  IStockPerVariantPages,
} from '@/interfaces/IStockPerVariant';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';
import { useCartStore } from '@/contexts/CartStore';

interface IProps {
  items: ICartItem[];
  totalPrice: number;
  clientName: string;
  clientPhone: string;
  additionalDetails: string;
  clientId?: number;
  subtotalPrice: number;
}

export default function useCreateOrderMutation() {
  const clearCart = useCartStore((state) => state.clearCart);
  return useMutation(async (props: IProps) => {
    const resp = [null, null] as [any, any];
    resp[0] = await strapi.create(
      getOrderQueryKey(),
      parseOrderToPayLoad(props),
    );

    const excludeServiceItem = (item: ICartItem): boolean =>
      !item.product.isService;

    const itemsToUpdate = props.items.filter(excludeServiceItem);

    if (itemsToUpdate.length) {
      resp[1] = await updateStock(itemsToUpdate);
    }
    clearCart();

    return resp;
  });
}

function parseOrderToPayLoad({
  items,
  totalPrice,
  additionalDetails,
  clientId,
  subtotalPrice,
}: IProps): IOrder<number | undefined, IOrderItem<number, number>> {
  return {
    items: items.map((item): IOrderItem<number, number> => {
      return {
        product: item.product.id,
        quantity: item.quantity,
        price: item.selectedVariant.price,
        selectedVariant: item.selectedVariant.id!,
      };
    }),
    additionalDetails: additionalDetails,
    totalPrice: totalPrice,
    client: clientId || undefined,
    status: ORDER_STATUS.PENDING,
    subtotalPrice: subtotalPrice,
  };
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
  const updatedStockPerVariant = stockPerVariant.data.map(
    (spv): Pick<IStockPerVariant, 'id' | 'stock'> => {
      const item = items.find(
        (i) => spv.attributes.variant === i.selectedVariant.id,
      );

      if (!item)
        return {
          id: spv.id,
          stock: spv.attributes.stock,
        };
      return {
        id: spv.id,
        stock: spv.attributes.stock - item.quantity,
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

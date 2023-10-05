import { ICartItem, IPromoItem } from '@/interfaces/ICart';
import {
  IDiscount,
  IOrder,
  IOrderItem,
  ORDER_STATUS,
} from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';
import { useCartStore } from '@/contexts/CartStore';
import { ICoupon } from '@/interfaces/ICoupon';

interface IProps {
  items: ICartItem[];
  totalPrice: number;
  additionalDetails: string;
  clientId?: number | null;
  subtotalPrice: number;
  discount?: IDiscount;
  coupon?: ICoupon;
  promoItems?: IPromoItem[];
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
  discount,
  coupon,
  promoItems,
}: IProps): IOrder<number | undefined, IOrderItem<number, number>, number> {
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
    discount: discount,
    coupon: coupon?.id!,
    promoItems: promoItems!,
  };
}

async function updateStock(items: ICartItem[]) {
  const promises = items.map((item) => {
    if (!item.selectedVariant.id) throw new Error('No se encontro el id');
    const { stock, id } = item.selectedVariant.stock_per_variant;
    return strapi.update('stock-per-variants', id!, {
      stock: stock,
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

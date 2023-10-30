import { IOrderResponse, IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getOrderQueryKey = () => 'orders';

export default function useOrderQuery() {
  return useQuery<IOrder[]>([getOrderQueryKey()], async () => {
    const orderResponse = (await strapi.find(getOrderQueryKey(), {
      filters: {
        status: ORDER_STATUS.PENDING,
      },
      populate: [
        'client',
        'items.product',
        'items.product.image',
        'items.product.type',
        'discount',
        'payments',
        'items.selectedVariant',
        'items.selectedVariant.stock_per_variant',
        'coupon',
        'promoItems',
        'promoItems.promo',
        'promoItems.selectedVariants',
        'promoItems.selectedVariants.stock_per_variant',
        'promoItems.selectedVariants.product',
        'promoItems.selectedVariants.product.type',
      ],
    })) as unknown as IOrderResponse;
    return orderResponse.results;
  });
}

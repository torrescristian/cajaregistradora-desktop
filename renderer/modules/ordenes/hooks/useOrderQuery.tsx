import { IOrderResponse, IOrder, ORDER_STATUS } from '@/modules/ordenes/interfaces/IOrder';
import { ORDERS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';



export default function useOrderQuery() {
  return useQuery<IOrder[]>([ORDERS_KEY], async () => {
    const orderResponse = (await strapi.find(ORDERS_KEY, {
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

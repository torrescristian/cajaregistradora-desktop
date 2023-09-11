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

        'discount',
        'payments',
        'items.selectedVariant',
      ],
    })) as unknown as IOrderResponse;
    return orderResponse.results;
  });
}

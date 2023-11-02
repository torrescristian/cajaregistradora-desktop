import { IOrder } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { getOrderQueryKey } from './useOrderQuery';

export const findOrderById = async (orderId: number): Promise<IOrder> => {
  const orderResponse = (await strapi.findOne(getOrderQueryKey(), orderId, {
    populate: [
      'client',
      'items.product',
      'items.product.image',
      'discount',
      'payments',
      'items.selectedVariant',
      'coupon',
      'promoItems',
      'promoItems.promo',
      'promoItems.selectedVariants',
      'promoItems.selectedVariants.product',
      'store'
    ],
  })) as unknown as IOrder;

  return orderResponse;
};

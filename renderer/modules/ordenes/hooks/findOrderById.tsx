import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { ORDERS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';


export const findOrderById = async (orderId: number): Promise<IOrder> => {
  const orderResponse = (await strapi.findOne(ORDERS_KEY, orderId, {
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
      'store',
    ],
  })) as unknown as IOrder;

  return orderResponse;
};

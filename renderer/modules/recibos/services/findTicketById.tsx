import { TICKETS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';

import { ITicket } from '@/modules/recibos/interfaces/ITicket';

export default async function findTicketById(
  ticketId: number,
): Promise<ITicket> {
  const ticketResponse = (await strapi.findOne(TICKETS_KEY, ticketId, {
    populate: [
      'cashBalance',
      'order',
      'order.discount.amount',
      'payments',
      'order.client',
      'order.items.product',
      'order.items.product.image',
      'order.discount',
      'order.payments',
      'order.items.selectedVariant',
      'order.coupon',
      'order.promoItems',
      'order.promoItems.promo',
      'order.promoItems.selectedVariants',
      'order.promoItems.selectedVariants.product',
      'order.store',
    ],
  })) as unknown as ITicket;
  return ticketResponse;
}

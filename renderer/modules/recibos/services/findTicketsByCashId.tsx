import { TICKETS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';

import { ITicket, ITicketResponse } from '@/modules/recibos/interfaces/ITicket';

export default async function findTicketsByCashId(
  cashId: number,
): Promise<ITicket[]> {
  const ticketResponse = (await strapi.find(TICKETS_KEY, {
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
      'store'
    ],
    filters: {
        cashBalance: cashId
    },
    pageSize: 10000
  })) as unknown as ITicketResponse;
  return ticketResponse.results;
}

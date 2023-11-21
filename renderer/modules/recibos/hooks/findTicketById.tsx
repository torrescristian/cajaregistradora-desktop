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
      'order.client',
      'order.coupon',
      'order.discount.amount',
      'payments',
      'store',
    ],
  })) as unknown as ITicket;
  return ticketResponse;
}

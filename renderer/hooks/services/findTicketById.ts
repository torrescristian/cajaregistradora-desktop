import strapi from '@/libs/strapi';
import { getTicketsQueryKey } from './useTicketQuery';
import { ITicket } from '@/interfaces/ITicket';

export default async function findTicketById(
  ticketId: number,
): Promise<ITicket> {
  const ticketResponse = (await strapi.findOne(getTicketsQueryKey(), ticketId, {
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

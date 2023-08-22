import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { ITicket, ITicketResponse } from '@/interfaces/ITicket';

export const getTicketsQueryKey = () => 'tickets';

export default function useOrderQuery() {
  return useQuery<ITicket[]>([getTicketsQueryKey()], async () => {
    const ticketResponse = (await strapi.find(getTicketsQueryKey(), {
      populate: ['order', 'order.client', 'order.items.product'],
    })) as unknown as ITicketResponse;
    return ticketResponse.results;
  });
}

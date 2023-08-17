import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { TICKET_STATUS, ITicket, ITicketResponse } from '@/interfaces/ITicket';

export const getTicketsQueryKey = () => 'tickets';

const parseTicketFacade = (ticketResponse: ITicketResponse): ITicket[] => {
  return ticketResponse.results.map((ticket) => {
    return {
      id: ticket.id,
      order: ticket.order,
      total_price: ticket.total_price,
      status: TICKET_STATUS.PAID,
    };
  });
};

export default function useOrderQuery() {
  return useQuery<ITicket[]>([getTicketsQueryKey()], async () => {
    const ticketResponse = (await strapi.find(getTicketsQueryKey(), {
      populate: ['order', 'order.client', 'order.items.product'],
    })) as unknown as ITicketResponse;
    return parseTicketFacade(ticketResponse);
  });
}

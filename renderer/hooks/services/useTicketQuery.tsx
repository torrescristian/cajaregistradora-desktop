import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import {TICKET_STATUS, ITicketExpanded, ITicketResponseExpanded } from '@/interfaces/ITicket';

export const getTicketsQueryKey = () => 'tickets';

const parseTicketFacade = (ticketResponse: ITicketResponseExpanded): ITicketExpanded[] => {
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
  return useQuery<ITicketExpanded[]>([getTicketsQueryKey()], async () => {
    const ticketResponse = await strapi.find(getTicketsQueryKey(),
    { populate: ['order','order.client','order.items.product'] }) as unknown as ITicketResponseExpanded;
    return parseTicketFacade(ticketResponse);
  });
}

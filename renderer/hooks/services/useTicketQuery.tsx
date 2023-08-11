import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import {TICKET_STATUS, ITicketExpanded, ITicketResponseExpanded } from '@/interfaces/ITicket';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (ticketResponse: ITicketResponseExpanded): ITicketExpanded[] => {
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
  return useQuery<ITicketExpanded[]>([getOrderQueryKey()], async () => {
    const ticketResponse = (await strapi.find('tickets'),
    { populate: '*' }) as unknown as ITicketResponseExpanded;
    return parseOrderFacade(ticketResponse);
  });
}

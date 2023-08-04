import { IOrder, IOrderResponse, IOrderUI } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import ITicket, { ITicketResponse, TICKET_STATUS } from '@/interfaces/ITicket';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (ticket: ITicketResponse): ITicket[] => {
  return ticket.results.map((props) => {
    return {
      date: props.date,
      id: props.id,
      order: props.order as IOrder,
      total_price: props.total_price,
      status: TICKET_STATUS.PAID,
    };
  });
};

export default function useOrderQuery() {
  return useQuery<ITicket[]>([getOrderQueryKey()], async () => {
    const ticketResponse = (await strapi.find('tickets'),
    { populate: '*' }) as unknown as ITicketResponse;
    return parseOrderFacade(ticketResponse);
  });
}

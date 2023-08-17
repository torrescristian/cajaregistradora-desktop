import  { TICKET_STATUS,ITicket } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import { TicketPayloadSchema } from '@/schemas/TicketSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';

import { getTicketsQueryKey } from './useTicketQuery';
import { ORDER_STATUS } from '@/interfaces/IOrder';


type ICreateTicketMutation = Omit<ITicket<number>, 'id' | 'status'>;

export default function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (ticket: ICreateTicketMutation) => {
    await TicketPayloadSchema().validate(ticket);
    const ticketRes = await strapi.create(getTicketsQueryKey(), {
      ...ticket,
      status: TICKET_STATUS.PAID,
    } as ITicket<number>);

    const orderRes = await strapi.update(getOrderQueryKey(),ticket.order,
    {
      status: ORDER_STATUS.PAID
    });
     queryClient.invalidateQueries([getOrderQueryKey()]);
     queryClient.invalidateQueries([getTicketsQueryKey()]);
    return [ticketRes,orderRes];
  });
}

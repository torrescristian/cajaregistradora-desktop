import  { TICKET_STATUS,ITicket } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import TicketSchema from '@/schemas/TicketSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';

import { getTicketsQueryKey } from './useTicketQuery';
import { ORDER_STATUS } from '@/interfaces/IOrder';


type ICreateTicketMutation = Omit<ITicket, 'id' | 'status'>;

export default function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (data: ICreateTicketMutation) => {
    await TicketSchema().validate(data);
    const ticketRes = await strapi.create(getTicketsQueryKey(), {
      ...data,
      status: TICKET_STATUS.PAID,
    } as ITicket);

    const orderRes = await strapi.update(getOrderQueryKey(),data.order,
    {
      status: ORDER_STATUS.PAID
    });
    queryClient.invalidateQueries([getOrderQueryKey(),getTicketsQueryKey()]);
    return [ticketRes,orderRes];
  });
}

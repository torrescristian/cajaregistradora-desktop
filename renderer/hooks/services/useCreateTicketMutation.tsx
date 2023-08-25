import { TICKET_STATUS, ITicket, ITicketPayload } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import { TicketPayloadSchema } from '@/schemas/TicketSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';

import { getTicketsQueryKey } from './useTicketQuery';
import { ORDER_STATUS } from '@/interfaces/IOrder';
import useActiveCashBalanceQuery, { getCashBalanceKey } from './useActiveCashBalanceQuery';

type ICreateTicketMutation = Omit<ITicketPayload, 'id' | 'status'>;

export default function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  const {
    cashBalance,
    isLoading,
    isError,
    isSuccess,
    cashIsActive
  } = useActiveCashBalanceQuery();

  return useMutation(async (ticket: ICreateTicketMutation) => {
    await TicketPayloadSchema().validate(ticket);
    const ticketResPromise = strapi.create(getTicketsQueryKey(), {
      ...ticket,
      status: TICKET_STATUS.PAID,
    } as ITicketPayload);

    const orderResPromise =  strapi.update(getOrderQueryKey(), ticket.order, {
      status: ORDER_STATUS.PAID,
    });
    const newCashBalancePromise =  strapi.update(getCashBalanceKey(), cashBalance?.id!, {
      newCashAmount: cashBalance?.newCashAmount! + ticket.total_price,
    })
    const res = await Promise.all([ticketResPromise, orderResPromise, newCashBalancePromise]);
    queryClient.invalidateQueries([getOrderQueryKey()]);
    queryClient.invalidateQueries([getTicketsQueryKey()]);
    queryClient.invalidateQueries([getCashBalanceKey()]);
    return res;
  });
}

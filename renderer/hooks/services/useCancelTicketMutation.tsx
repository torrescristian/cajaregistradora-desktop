import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCancelOrderMutation from './useCancelOrderMutation';
import { TICKET_STATUS } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import * as yup from 'yup';
import { getTicketsQueryKey } from './useTicketQuery';
import { getOrderQueryKey } from './useOrderQuery';
interface IProps {
  ticketId: number;
  orderId: number;
}

export default function useCancelTicketMutation() {
  const cancelOrderMutation = useCancelOrderMutation();
  const queryClient = useQueryClient();
  return useMutation(async ({ ticketId, orderId }: IProps) => {
    await yup.number().required().validate(ticketId);
    await yup.number().required().validate(orderId);
    const cancelOrderResult = await cancelOrderMutation.mutate(orderId);
    const updateTicketResult = await strapi.update('tickets', ticketId, {
      status: TICKET_STATUS.REFUNDED,
    });

    queryClient.invalidateQueries([getTicketsQueryKey()]);
    queryClient.invalidateQueries([getOrderQueryKey()]);

    return [cancelOrderResult, updateTicketResult];
  });
}

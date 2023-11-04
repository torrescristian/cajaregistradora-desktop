import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCancelOrderMutation from './useCancelOrderMutation';
import { TICKET_STATUS } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import * as yup from 'yup';
import { getTicketsQueryKey } from './useTicketQuery';
import { getOrderQueryKey } from './useOrderQuery';
import { ICashBalance } from '@/interfaces/ICashBalance';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';
import { useAuthState } from '@/contexts/AuthContext';
import { IOrder } from '@/interfaces/IOrder';
interface IProps {
  ticketId: number;
  order: IOrder;
  amountTicket: number;
  cashBalance: ICashBalance;
  returnType: 'cash' | 'other';
}

export default function useCancelTicketMutation() {
  const { isOwner } = useAuthState();
  const cancelOrderMutation = useCancelOrderMutation();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      ticketId,
      order,
      amountTicket,
      cashBalance,
      returnType,
    }: IProps) => {
      await yup.number().required().validate(ticketId)
      await yup.number().required().validate(order.id!);
      await yup.number().required().validate(amountTicket);
      await yup.number().required().validate(cashBalance.id!);
      await yup.number().required().validate(cashBalance.newCashAmount);
      const cancelOrderResult = await cancelOrderMutation.mutate(order);
      const updateTicketResult = await strapi.update(
        getTicketsQueryKey(),
        ticketId,
        {
          status: isOwner
            ? TICKET_STATUS.REFUNDED
            : TICKET_STATUS.WAITING_FOR_REFUND,
        },
      );
      const returnMoney = await strapi.update(
        getCashBalanceKey(),
        cashBalance.id!,
        {
          newCashAmount:
            returnType === 'cash'
              ? Math.max(cashBalance.newCashAmount - amountTicket, 0)
              : cashBalance.newCashAmount,
          totalAmount: Math.max(cashBalance.totalAmount - amountTicket, 0),
        } as Partial<ICashBalance>,
      );
      queryClient.invalidateQueries([getTicketsQueryKey()]);
      queryClient.invalidateQueries([getOrderQueryKey()]);
      return [cancelOrderResult, updateTicketResult, returnMoney];
    },
  );
}

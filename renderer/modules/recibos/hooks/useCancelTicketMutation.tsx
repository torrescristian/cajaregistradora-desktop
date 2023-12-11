import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCancelOrderMutation from '../../ordenes/hooks/useCancelOrderMutation';
import { TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';
import strapi from '@/modules/common/libs/strapi';
import * as yup from 'yup';

import { ICashBalance } from '@/modules/caja/interfaces/ICashBalance';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import {
  TICKETS_KEY,
  ORDERS_KEY,
  CASH_BALANCE_KEY,
} from '@/modules/common/consts';
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
      await yup.number().required().validate(ticketId);
      await yup.number().required().validate(order.id);
      await yup.number().required().validate(amountTicket);
      await yup.number().required().validate(cashBalance.id!);
      await yup.number().required().validate(cashBalance.newCashAmount);
      const cancelOrderResult = await cancelOrderMutation.mutate(order);
      const updateTicketResult = await strapi.update(TICKETS_KEY, ticketId, {
        status: isOwner
          ? TICKET_STATUS.REFUNDED
          : TICKET_STATUS.WAITING_FOR_REFUND,
      });
      const returnMoney = await strapi.update(
        CASH_BALANCE_KEY,
        cashBalance.id!,
        {
          newCashAmount:
            returnType === 'cash'
              ? Math.max(cashBalance.newCashAmount - amountTicket, 0)
              : cashBalance.newCashAmount,
          totalAmount: Math.max(cashBalance.totalAmount - amountTicket, 0),
        } as Partial<ICashBalance>,
      );
      queryClient.invalidateQueries([TICKETS_KEY]);
      queryClient.invalidateQueries([ORDERS_KEY]);
      return [cancelOrderResult, updateTicketResult, returnMoney];
    },
  );
}

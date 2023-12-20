import React, { useRef } from 'react';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useTicketPendingQuery from '@/modules/recibos/hooks/useTicketPendingQuery';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import TicketPendingTable from './TicketPedingTable';
import Loader from '@/modules/common/components/Loader';
import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import useExpensesTypeQuery from '../hooks/useExpenseTypesQuery';
import useExpensesPendingQuery from '../hooks/useExpensesPendingQuery';
import ExpensesPendingTable from './ExpensesPendingTable';
import { IExpense } from '../interfaces/IExpense';

export default function ConfirmExpensesModal() {
  const ticketPendingQuery = useTicketPendingQuery();
  const ticketPending = ticketPendingQuery.data || [];

  const expensesPendingQuery = useExpensesPendingQuery();
  const expensePending = expensesPendingQuery.data || [];

  if (ticketPendingQuery.isLoading) return <Loader />;
  const dataTicket = ticketPendingQuery.data?.map(
    (ticket) =>
      ({
        id: ticket.id,
        order: ticket.order,
        cashBalance: ticket.cashBalance,
        totalPrice: ticket.totalPrice,
        couponDiscount: ticket.couponDiscount,
        payments: ticket.payments,
        status: ticket.status,
      }) as ITicket,
  );
  if (expensesPendingQuery.isLoading) return <Loader />;
  const dataExpenses = expensesPendingQuery.data?.map(
    (expense) =>
      ({
        id: expense.id,
        amount: expense.amount,
        status: expense.status,
        reason: expense.reason,
        type: expense.type,
        cashBalance: expense.cashBalance,
      }) as IExpense,
  );

  const { isOwner } = useAuthState();

  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <RenderIf condition={isOwner}>
        <RenderIf condition={ticketPending.length > 0}>
          <p className="text-xl text-center divider">Devoluciones Pendientes</p>
          <TicketPendingTable tickets={dataTicket!} />
        </RenderIf>
        <RenderIf condition={expensePending.length > 0}>
          <p className="text-xl text-center divider">Gastos Pendientes</p>
          <ExpensesPendingTable data={dataExpenses!} />
        </RenderIf>
      </RenderIf>
    </div>
  );
}

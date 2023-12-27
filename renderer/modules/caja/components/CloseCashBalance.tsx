import useCancelCashBalanceMutation from '@/modules/caja/hooks/useCancelCashBalanceMutation';
import useExpensesPendingQuery from '../hooks/useExpensesPendingQuery';
import useTicketPendingQuery from '@/modules/recibos/hooks/useTicketPendingQuery';

interface IProps {
  cashBalanceId: number;
}

export const CloseCashBalance = ({ cashBalanceId }: IProps) => {
  const cancelCashBalanceMutation = useCancelCashBalanceMutation();

  const expensePendingQuery = useExpensesPendingQuery({ page: 1 });
  const expensePending = expensePendingQuery.data?.expenses || [];

  const ticketPendingQuery = useTicketPendingQuery({ page: 1 });
  const ticketPending = ticketPendingQuery.data?.tickets || [];

  const handleCancelCashBalance = () => {
    cancelCashBalanceMutation.mutate(cashBalanceId);
  };
  return (
    <button
      className="btn flex w-fit bg-red-500 text-base-content hover:bg-red-600"
      onClick={handleCancelCashBalance}
      disabled={expensePending.length > 0 || ticketPending.length > 0}
    >
      Cerrar caja
    </button>
  );
  //TODO:create confirm modal
};

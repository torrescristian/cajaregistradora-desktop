import useCancelCashBalanceMutation from '@/modules/caja/hooks/useCancelCashBalanceMutation';
import useExpensesPendingQuery from '../hooks/useExpensesPendingQuery';
import useTicketPendingQuery from '@/modules/recibos/hooks/useTicketPendingQuery';

interface IProps {
  cashBalanceId: number;
}

export const CloseCashBalance = ({ cashBalanceId }: IProps) => {
  const cancelCashBalanceMutation = useCancelCashBalanceMutation();

  const expensePendingQuery = useExpensesPendingQuery();
  const expensePending = expensePendingQuery.data || [];

  const ticketPendingQuery = useTicketPendingQuery();
  const ticketPending = ticketPendingQuery.data || [];

  const handleCancelCashBalance = () => {
    cancelCashBalanceMutation.mutate(cashBalanceId);
  };
  return (
    <button
      className="btn flex w-fit bg-red-500 text-text-base-content hover:bg-red-600"
      onClick={handleCancelCashBalance}
      disabled={expensePending.length > 0 || ticketPending.length > 0}
    >
      Cerrar caja
    </button>
  );
  //TODO:create confirm modal
};

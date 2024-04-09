import Loader from '@/modules/common/components/atoms/Loader';
import { IExpense } from '../interfaces/IExpense';
import ExpensesPendingTable from './ExpensesPendingTable';
import {
  Pagination,
  usePagination,
} from '@/modules/common/components/molecules/Pagination';
import useExpensesPendingQuery from '../hooks/useExpensesPendingQuery';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';

export default function ExpensesPending() {
  const paginationControls = usePagination();

  const expensesPendingQuery = useExpensesPendingQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const expensePending = expensesPendingQuery.data?.expenses || [];

  if (expensesPendingQuery.isLoading) return <Loader />;
  const dataExpenses = expensesPendingQuery.data?.expenses.map(
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

  return (
    <div className="w-full flex flex-col gap-5 justify-center">
      <RenderIf condition={expensePending.length > 0}>
        <p className="text-xl text-center divider">Gastos Pendientes</p>
        <ExpensesPendingTable data={dataExpenses!} />
        <Pagination {...paginationControls} />
      </RenderIf>
    </div>
  );
}

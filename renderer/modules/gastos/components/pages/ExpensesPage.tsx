import { IExpense } from '@/modules/caja/interfaces/IExpense';
import Loader from '@/modules/common/components/atoms/Loader';
import useExpensesQuery from '../../hooks/useExpensesQuery';
import ExpensesTable from '../templates/ExpensesTable';
import {
  Pagination,
  usePagination,
} from '@/modules/common/components/molecules/Pagination';
import CreateExpenseForm from '../organisms/CreateExpenseForm';

export default function ExpensePage() {
  const paginationControls = usePagination();

  const expensesQuery = useExpensesQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  const expenses = expensesQuery.data?.expenses || [];

  if (expensesQuery.isLoading) return <Loader />;
  const data = expenses.map(
    (expense) =>
      ({
        id: expense.id,
        amount: expense.amount,
        reason: expense.reason,
        createdAt: expense.createdAt,
        status: expense.status,
        type: expense.type,
      }) as IExpense,
  );
  return (
    <section className="w-full flex flex-col justify-center gap-10">
      <CreateExpenseForm data={data} />
      <ExpensesTable data={data!} />
      <Pagination {...paginationControls} />
    </section>
  );
}

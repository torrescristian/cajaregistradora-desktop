import useExpensesTypeQuery from '@/modules/caja/hooks/useExpenseTypesQuery';
import { IExpense } from '@/modules/caja/interfaces/IExpense';
import FieldLabel from '@/modules/common/components/FieldLabel';
import Loader from '@/modules/common/components/Loader';
import { useForm } from 'react-hook-form';
import useCreateExpenseNoBalanceMutation from '../hooks/useCreateExpenseNoBalanceMutation';
import useExpensesQuery from '../hooks/useExpensesQuery';
import ExpensesTable from './ExpensesTable';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';

export default function ExpenseView() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IExpense>();

  const paginationControls = useButtonPagination();
  const expensesQuery = useExpensesQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const expenses = expensesQuery.data?.expenses || [];
  const createExpenseMutation = useCreateExpenseNoBalanceMutation();

  const expenseTypesQuery = useExpensesTypeQuery();
  const expenseTypes = expenseTypesQuery.data || [];

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

  const handleSubmitCreateExpense = (data: IExpense) => {
    createExpenseMutation.mutate(data);
    reset();
  };

  return (
    <section className="w-full flex flex-col justify-center gap-10">
      <form
        className="w-full flex flex-row p-5 justify-center items-end gap-5"
        onSubmit={handleSubmit(handleSubmitCreateExpense)}
      >
        <FieldLabel
          title="Dinero a retirar:"
          columnMode
          className="text-center"
        >
          <input
            className="input input-bordered"
            type="number"
            {...register('amount')}
          />
        </FieldLabel>
        <FieldLabel title="Motivo:" columnMode className="text-center">
          <input className="input input-bordered" {...register('reason')} />
        </FieldLabel>
        <FieldLabel title="Categorias:" columnMode className="text-center">
          <select className="select select-primary" {...register('type.id')}>
            <option>Selecciona una opción</option>
            {expenseTypes.map((expenseType) => (
              <option key={expenseType.id} value={expenseType.id}>
                {expenseType.name}
              </option>
            ))}
          </select>
        </FieldLabel>
        <button className="btn btn-primary">Confirmar</button>
      </form>

      <ExpensesTable data={data!} />
      <ButtonPagination {...paginationControls} />
    </section>
  );
}

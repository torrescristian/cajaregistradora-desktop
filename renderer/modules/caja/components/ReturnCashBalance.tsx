import FieldLabel from '@/modules/common/components/FieldLabel';
import ExpensesTable from './ExpensesTable';
import useExpensesQuery from '../hooks/useExpensesQuery';
import { IExpense } from '../interfaces/IExpense';
import Loader from '@/modules/common/components/Loader';
import useCreateExpenseMutation from '../hooks/useCreateExpenseMutation';
import { useForm } from 'react-hook-form';
import useExpensesTypeQuery from '../hooks/useExpenseTypesQuery';

export default function ReturnCashBalance() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IExpense>();

  const expensesQuery = useExpensesQuery();
  const createExpenseMutation = useCreateExpenseMutation();

  const expenseTypesQuery = useExpensesTypeQuery();
  const expenseTypes = expenseTypesQuery.data || [];

  if (expensesQuery.isLoading) return <Loader />;
  const data = expensesQuery.data?.map(
    (expense) =>
      ({
        id: expense.id,
        amount: expense.amount,
        reason: expense.reason,
        createdAt: expense.createdAt,
        cashBalance: expense.cashBalance,
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
        className="w-full flex flex-row p-5 items-end gap-5"
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
    </section>
  );
}

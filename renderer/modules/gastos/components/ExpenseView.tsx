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
import { useState } from 'react';

export default function ExpenseView() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IExpense>();

  const [discountCashBalance, setDiscountCashBalance] = useState(true);

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

  const handleChangeDiscountCashBalance = () => {
    setDiscountCashBalance(!discountCashBalance);
  };

  const handleSubmitCreateExpense = (data: IExpense) => {
    createExpenseMutation.mutate({
      expense: data,
      discountCashBalance,
    });
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
        <FieldLabel
          title="¿Descontar de la caja?"
          className="gap-5 items-center"
          classNameTitle="w-1/2"
        >
          <input
            className="checkbox checkbox-secondary"
            value={String(discountCashBalance)}
            type="checkbox"
            onChange={handleChangeDiscountCashBalance}
            checked={discountCashBalance}
          />
        </FieldLabel>
        <button className="btn btn-primary">Confirmar</button>
      </form>

      <ExpensesTable data={data!} />
      <ButtonPagination {...paginationControls} />
    </section>
  );
}

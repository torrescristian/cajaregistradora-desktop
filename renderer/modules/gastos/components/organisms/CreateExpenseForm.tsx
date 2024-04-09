import useExpensesTypeQuery from '@/modules/caja/hooks/useExpenseTypesQuery';
import { IExpense } from '@/modules/caja/interfaces/IExpense';
import FieldLabel from '@/modules/common/components/atoms/FieldLabel';
import { useForm } from 'react-hook-form';
import ExpensesTable from '../templates/ExpensesTable';
import {
  Pagination,
  usePagination,
} from '@/modules/common/components/molecules/Pagination';
import { useState } from 'react';
import useCreateCashBalanceExpenseMutation from '@/modules/caja/hooks/useCreateCashBalanceExpenseMutation';

interface IProps {
  data: IExpense[];
}

export default function CreateExpenseForm({ data }: IProps) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IExpense>();

  const [discountCashBalance, setDiscountCashBalance] = useState(true);

  const createExpenseMutation = useCreateCashBalanceExpenseMutation();

  const handleChangeDiscountCashBalance = () => {
    setDiscountCashBalance(!discountCashBalance);
  };

  const handleSubmitCreateExpense = async (data: IExpense) => {
    await createExpenseMutation.mutateAsync(data);
    reset();
  };

  return (
    <form
      className="w-full flex flex-row p-5 justify-center items-end gap-5"
      onSubmit={handleSubmit(handleSubmitCreateExpense)}
    >
      <FieldLabel title="Dinero a retirar:" columnMode className="text-center">
        <input
          className="input input-bordered"
          type="number"
          {...register('amount')}
        />
      </FieldLabel>
      <FieldLabel title="Motivo:" columnMode className="text-center">
        <input className="input input-bordered" {...register('reason')} />
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
  );
}

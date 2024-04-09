import { formatPrice } from '@/modules/common/libs/utils';
import { IExpense } from '../interfaces/IExpense';
import { DataItem } from '@/modules/common/components/atoms/DataItem';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import useAprovedExpensePending from '../hooks/useAprovedExpensePending';
import { ButtonClose } from '@/modules/common/components/atoms/ButtonClose';

interface IProps {
  expense: IExpense;
}

export default function AprovExpenseModal({ expense }: IProps) {
  const aprovedExpensePending = useAprovedExpensePending();

  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };
  const handleCancelExpensePending = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar la recarga de la página
    aprovedExpensePending.mutate({ expense });
    ref.current?.close();
  };

  return (
    <section className="w-full flex justify-center">
      <button
        className="btn btn-success text-neutral-content"
        onClick={handleOpenModal}
      >
        <CheckIcon className="w-5 h-5" /> Aprobar
      </button>
      <dialog ref={ref} className="w-min">
        <form
          key={expense.id}
          className="flex flex-col gap-5 border-2 border-neutral-content p-4"
          onSubmit={handleCancelExpensePending}
        >
          <DataItem
            defaultValue=""
            label="Aprobar Ticket número:"
            value={expense.id}
          />{' '}
          <DataItem
            defaultValue=""
            label="Total a Reembolsar:"
            value={formatPrice(expense.amount)}
          />
          <ButtonClose
            label="Cerrar sin confirmar"
            className="btn btn-error btn-link text-secondary-focus"
            onClick={handleCloseModal}
          />
          <button className="btn btn-primary" type="submit">
            Confirmar
          </button>
        </form>
      </dialog>
    </section>
  );
}

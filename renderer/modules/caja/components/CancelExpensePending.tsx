import { useRef } from 'react';
import useAprovedExpensePending from '../hooks/useAprovedExpensePending';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { IExpense } from '../interfaces/IExpense';
import { DataItem } from '@/modules/common/components/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import useRejectdExpensePending from '../hooks/useRejectedExpensePending copy';

interface IProps {
  expense: IExpense;
}

export default function CancelExpensePending({ expense }: IProps) {
  const rejectdExpensePending = useRejectdExpensePending();

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
    rejectdExpensePending.mutate({ expense });
    ref.current?.close();
  };

  return (
    <section className="w-full flex justify-center">
      <button className="btn btn-error " onClick={handleOpenModal}>
        <XMarkIcon className="w-5 h-5" /> Rechazar
      </button>
      <dialog ref={ref} className="w-min">
        <form
          key={expense.id}
          className="flex flex-col gap-5 border-2 border-neutral-content p-4"
          onSubmit={handleCancelExpensePending}
        >
          <DataItem
            defaultValue=""
            label="Rechazar ticket número:"
            value={expense.id}
          />{' '}
          <DataItem
            defaultValue=""
            label="Total a Reembolsar:"
            value={formatPrice(expense.amount)}
          />
          <button className="btn btn-primary" type="submit">
            Confirmar
          </button>
          <button
            className="btn btn-error btn-link text-secondary-focus"
            onClick={handleCloseModal}
          >
            {' '}
            Cerrar sin Cancelar
          </button>
        </form>
      </dialog>
    </section>
  );
}

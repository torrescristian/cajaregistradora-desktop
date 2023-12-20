import { IExpense } from '@/modules/caja/interfaces/IExpense';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useCancelExpensesMutation } from '../hooks/useCancelExpensesMutation';

interface IProps {
  expense: IExpense;
}

export default function ButtonCancelExpense({ expense }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const cancelExpensesMutation = useCancelExpensesMutation();

  const handleClickOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleClickCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleClickCancelExpense = () => {
    cancelExpensesMutation.mutate(expense);
    ref.current?.close();
  };

  return (
    <section>
      <button
        className="btn btn-error text-neutral-content"
        onClick={handleClickOpenModal}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className="modal-box w-full">
        <div className="flex flex-col w-full gap-10 p-5">
          <p className="whitespace-nowrap text-center font-bold">
            ¿Desea eliminar este Gasto?
          </p>
          <div className="flex flex-row w-full gap-4 justify-end">
            <button className="btn btn-ghost" onClick={handleClickCloseModal}>
              Cancelar
            </button>
            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickCancelExpense}
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

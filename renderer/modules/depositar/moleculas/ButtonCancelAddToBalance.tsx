import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useCancelAddToBalanceMutation } from '../hooks/useCancelAddToBalanceMutation';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

interface IProps {
  newAddBalance: INewAddBalance;
}

export default function ButtonCancelAddToBalance({ newAddBalance }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const cancelAddToBalanceMutation = useCancelAddToBalanceMutation();

  const handleClickOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleClickCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleClickCancelAddToBalance = () => {
    cancelAddToBalanceMutation.mutate(newAddBalance);
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
            <ButtonClose
              label="Cancelar"
              className="btn btn-ghost"
              onClick={handleClickCloseModal}
            />

            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickCancelAddToBalance}
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

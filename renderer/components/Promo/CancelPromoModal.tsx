import useCancelPromoMutation from '@/hooks/services/useCancelPromoMutation';
import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useRef } from 'react';

interface IProps {
  promoId: number;
}

export const CancelPromoModal = ({ promoId }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const cancelPromoMutation = useCancelPromoMutation();

  const handleClickConfirmDeletePromo = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
    cancelPromoMutation.mutate(promoId);
  };
  return (
    <section className="w-full">
      <button
        className="btn btn-error"
        onClick={() => ref.current?.showModal()}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className="modal-box">
        <div className="w-full flex flex-col p-5 gap-10">
          <p className="text-xl font-bold whitespace-nowrap text-center">
            Seguro que quieres eliminar esta promo?
          </p>
          <div className="flex flex-row w-full gap-5 justify-end">
            <button
              className="btn btn-error"
              onClick={handleClickConfirmDeletePromo}
            >
              Eliminar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => ref.current?.close()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

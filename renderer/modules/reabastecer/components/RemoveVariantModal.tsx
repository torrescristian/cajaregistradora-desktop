import { useRef } from 'react';
import useCancelVariantMutation from '../hooks/useCancelVariantMutation';
import { TrashIcon } from '@heroicons/react/24/solid';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

interface IProps {
  variantId: number;
}

export default function RemoveVariantModal({ variantId }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const cancelVariantMutation = useCancelVariantMutation();
  const handleRemoveVariant = () => {
    cancelVariantMutation.mutate(variantId);
    ref.current?.close();
  };

  return (
    <div className="flex justify-center">
      <button
        className="btn btn-link flex flex-row flex-nowrap text-error gap-3 w-fit"
        onClick={handleOpenModal}
      >
        <TrashIcon className="w-5 h-5" />
        <p className="font-bold">Eliminar Variante</p>
      </button>
      <dialog ref={ref} className="w-max">
        <div className=" flex flex-col gap-5 p-10 ">
          <p className="text-xl whitespace-nowrap font-bold">
            ¿Estás seguro de{' '}
            <span className="text-2xl badge-error badge-outline">ELIMINAR</span>{' '}
            esta variante?
          </p>
          <p>Esta acción no se puede deshacer.</p>
          <div className="flex flex-row justify-end gap-5">
            <button className="btn btn-error" onClick={handleRemoveVariant}>
              Eliminar
            </button>
            <ButtonClose
              label="Cerrar"
              className="btn btn-outline"
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}

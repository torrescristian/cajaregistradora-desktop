import useCancelProductMutation from '@/modules/reabastecer/hooks/useCancelProductMutation';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

interface IProps {
  productId: number;
}

export default function RemoveProductItemModal({ productId }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const cancelProductMutation = useCancelProductMutation();
  const handleRemoveProduct = () => {
    cancelProductMutation.mutate(productId);
  };
  return (
    <div className="flex justify-center">
      <button
        className="btn btn-link flex flex-row flex-nowrap text-error gap-3 w-fit"
        onClick={() => ref.current?.showModal()}
      >
        <TrashIcon className="w-5 h-5" />
        <p className="font-bold">Eliminar Producto</p>
      </button>
      <dialog ref={ref} className="w-max">
        <div className=" flex flex-col gap-5 p-10 ">
          <p className="text-xl whitespace-nowrap font-bold">
            ¿Estás seguro de eliminar este producto y{' '}
            <span className="text-2xl badge-error badge-outline">TODAS</span>{' '}
            sus variantes?
          </p>
          <p>Esta acción no se puede deshacer.</p>
          <div className="flex flex-row justify-end gap-5">
            <button className="btn btn-error" onClick={handleRemoveProduct}>
              Eliminar
            </button>
            <button
              className="btn btn-outline"
              onClick={() => ref.current?.close()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

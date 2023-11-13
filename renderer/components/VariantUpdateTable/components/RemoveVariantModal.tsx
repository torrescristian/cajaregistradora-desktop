import useCancelVariantMutation from "@/hooks/services/useCancelVariantMutation";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

interface IProps {
  variantId: number;
}

export default function RemoveVariantModal({ variantId }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const cancelVariantMutation = useCancelVariantMutation() 
  const handleRemoveVariant = () => {
    cancelVariantMutation.mutate(variantId);
  };
  return (
    <div className="flex justify-center">
      <button
        className="btn btn-error flex flex-row flex-nowrap  gap-3 w-fit"
        onClick={() => ref.current?.showModal()}
      >
        <TrashIcon className="w-5 h-5" />
        <p className="font-bold">Eliminar Variante</p>
      </button>
      <dialog ref={ref} className="w-max">
        <div className=" flex flex-col gap-5 p-10 ">
          <p className="text-xl whitespace-nowrap font-bold">
            ¿Estás seguro de eliminar{' '}
            <span className="text-2xl badge-error badge-outline">ESTA</span>{' '}
            Variante?
          </p>
          <p>Esta acción no se puede deshacer.</p>
          <div className="flex flex-row justify-end gap-5">
            <button className="btn btn-error" onClick={handleRemoveVariant}>
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

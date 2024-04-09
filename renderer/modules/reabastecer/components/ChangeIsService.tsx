import { ButtonClose } from '@/modules/common/components/atoms/ButtonClose';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import useUpdateProductMutation from '../hooks/useUpdateProductMutation';

interface IProps {
  product: IProduct;
}

export default function ChangeIsService({ product }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const updateProductMutation = useUpdateProductMutation();
  const [ChangeIsService, setChangeIsService] = useState(product.isService);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleChangeService = (e: React.MouseEvent) => {
    e.preventDefault();
    setChangeIsService(!ChangeIsService);
    updateProductMutation.mutate({
      id: product.id!,
      isService: !ChangeIsService,
    });
    ref.current?.close();
  };

  return (
    <div>
      <button
        className="btn btn-ghost btn-outline text-neutral-content gap-3"
        onClick={handleOpenModal}
      >
        <PencilIcon className="w-5 h-5" />
        {!product.isService
          ? 'Activar control de Stock'
          : 'Desactivar control de Stock'}
      </button>
      <dialog className="border-2 border-white" ref={ref}>
        <div className="w-full flex flex-col gap-10 p-5">
          <p>
            ¿Estás seguro de que deseas convertir{' '}
            <span className="text-xl font-bold link">
              {product.name}{' '}
              {!product.isService ? 'en Servicio' : 'en un producto con Stock?'}
            </span>{' '}
            ?
          </p>
          <div className="w-full flex flex-row justify-end gap-5 ">
            <ButtonClose label="Cerrar" onClick={handleCloseModal} />
            <button className="btn btn-primary" onClick={handleChangeService}>
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

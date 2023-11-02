import { IVariantExpanded } from '@/interfaces/IVariants';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import ProductRow from './ProductRow';
import { IProduct } from '@/interfaces/IProduct';

interface IProps {
  product: IProduct;
  variant: IVariantExpanded;
}

export const ProductModal = ({ product, variant }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickMoreInfo = () => {
    ref.current?.showModal();
  };

  return (
    <section className="w-full flex justify-center">
      <button
        className="btn btn-secondary btn-square"
        onClick={() => handleClickMoreInfo()}
      >
        <EllipsisHorizontalIcon className="w-8 h-8" />
      </button>
      <dialog ref={ref} className="bg-neutral  modal-box p-15 w-[40vw]">
        <div>
          <ProductRow product={product} key={product.id} variant={variant} />
        </div>
        <div className="w-full flex pt-10 justify-end">
          <button
            className="btn btn-link text-error"
            onClick={() => ref.current?.close()}
          >
            Cancelar
          </button>
        </div>
      </dialog>
    </section>
  );
};

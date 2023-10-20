import { IVariant, IVariantExpanded } from '@/interfaces/IVariants';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import ProductRow from './ProductRow';
import { IProduct } from '@/interfaces/IProduct';

interface IProps {
  product: IProduct;
}

export const ProductModal = ({ product }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickMoreInfo = () => {
    ref.current?.showModal();
  };

  return (
    <section>
      <button
        className="btn btn-info btn-circle"
        onClick={() => handleClickMoreInfo()}
      >
        <InformationCircleIcon className="w-8 h-8" />
      </button>
      <dialog ref={ref} className="bg-neutral p-15 w-[40vw]">
        <div>
          <ProductRow product={product} key={product.id} />
        </div>
      </dialog>
    </section>
  );
};

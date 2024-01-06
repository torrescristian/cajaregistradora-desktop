import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import ProductRow from './ProductRow';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { Card } from '@/modules/common/components/Card';
import { NewVariant } from './NewVariant';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import ChangeIsService from './ChangeIsService';

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
      <dialog ref={ref} className="bg-base-100 modal-box p-15 w-[40vw]">
        <Card>
          <div>
            <ProductRow product={product} key={product.id} variant={variant} />
          </div>
          <NewVariant product={product} />
        </Card>
        <div className="w-full flex pt-10 justify-end">
          <ButtonClose
            label="Cerrar"
            className="btn btn-error"
            onClick={() => ref.current?.close()}
          />
        </div>
      </dialog>
    </section>
  );
};

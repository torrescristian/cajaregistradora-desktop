import { IPromo } from '@/interfaces/IPromo';
import { getAddPromo, useCartStore } from '@/contexts/CartStore';
import { useRef, useState } from 'react';
import { formatPrice, range } from '@/libs/utils';
import { RenderIf } from '../RenderIf';
import { Card } from '../Card';
import { IPromoItem } from '@/interfaces/ICart';

interface IProps {
  promosItems: IPromoItem[];
  salesMode?: boolean;
}

export default function RenderPromos({
  promosItems,
  salesMode: createMode,
}: IProps) {
  const addPromo = useCartStore(getAddPromo);
  const ref = useRef<HTMLDialogElement>(null);
  const [selectedPromo, setSelectedPromo] = useState<IPromo>();
  const [selectors, setSelectors] = useState<any>({});

  const createIndex = ({
    categoryIndex,
    quantityIndex,
  }: {
    categoryIndex: number;
    quantityIndex: number;
  }) => {
    return `${categoryIndex}-${quantityIndex}`;
  };
  const handleClickAddPromo = (promo: IPromo) => () => {
    if (promo.categories?.length) {
      setSelectedPromo(promo);
      ref.current?.showModal();
      return;
    }
    addPromo({ promo, selectedVariants: promo.variants.map((v) => v.variant) });
  };

  const handleSelectorChange =
    (selectorProps: { categoryIndex: number; quantityIndex: number }) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Actualiza el estado cuando cambie un selector
      const newValue = e.target.value;
      setSelectors((prevSelectors: any) => ({
        ...prevSelectors,
        [createIndex(selectorProps)]: newValue,
      }));
    };

  const handleClickConfirmVariants = () => {
    const selectorsId = Object.values(selectors).map(Number);
    const allVariants =
      selectedPromo?.categories
        .map(({ category, quantity }) => category.variants)
        .flat() || [];
    const selectedVariants = selectorsId.map(
      (selectorId) => allVariants.find((variant) => variant.id === selectorId)!,
    );
    addPromo({
      promo: selectedPromo!,
      selectedVariants,
    });
    ref.current?.close();
  };

  return (
    <section className="flex flex-col w-full">
      <div className="divider">Promociones</div>
      <div className="flex flex-row gap-3 overflow-x-scroll p-5">
        {promosItems?.map(({ promo }) => (
          <div
            className="flex flex-col p-4 items-center border-2"
            key={promo.id!}
          >
            <p className="text-xl font-bold">{promo.name}</p>
            <p className="text-xl">{formatPrice(promo.price)}</p>
            <div className="flex flex-col justify-between p-4 gap-5">
              <div className="w-full shadow-2xl p-4">
                {promo.categories!.map(({ category, quantity }) => (
                  <div key={category.id} className="flex flex-col gap-4">
                    <p className="text-2xl list-item">{category.name}</p>
                    {category.variants.map((variant) => (
                      <div key={variant.id} className="whitespace-nowrap">
                        <p>
                          {variant.product.name} - {variant.name}:{' '}
                          {formatPrice(variant.price)}
                        </p>
                        <p>Cantidad: {quantity}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="w-full p-4 shadow-2xl">
                {promo.variants.map(({ variant, quantity }) => (
                  <div key={variant.id} className="whitespace-nowrap">
                    <p className="list-item">
                      {variant.product.name} - {variant.name} :{' '}
                      {formatPrice(variant.price)}
                    </p>
                    <p>Cantidad: {quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            <RenderIf condition={createMode}>
              <button
                className="btn btn-success"
                onClick={handleClickAddPromo(promo)}
              >
                Agregar
              </button>
            </RenderIf>
          </div>
        ))}
        <Card>
          <dialog ref={ref} className="bg-transparent p-5">
            <div className="modal-box w-fit">
              <p>Elegir productos</p>
              <div className="flex flex-col gap-5">
                {selectedPromo?.categories!.map(
                  ({ category, quantity }, categoryIndex) =>
                    range(quantity).map((_, quantityIndex) => (
                      <select
                        className="select select-bordered w-96"
                        key={createIndex({ categoryIndex, quantityIndex })}
                        value={
                          selectors[
                            createIndex({ categoryIndex, quantityIndex })
                          ] || ''
                        }
                        onChange={handleSelectorChange({
                          categoryIndex,
                          quantityIndex,
                        })}
                      >
                        {category.variants!.map((variant, index) => (
                          <option key={index} value={variant.id!}>
                            {variant.product.name}-{variant.name}
                          </option>
                        ))}
                      </select>
                    )),
                )}
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button
                    className="btn btn-success"
                    onClick={handleClickConfirmVariants}
                  >
                    Confirmar
                  </button>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </Card>
      </div>
    </section>
  );
}

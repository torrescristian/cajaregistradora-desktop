import { formatPrice, range } from '@/modules/common/libs/utils';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Card } from '@/modules/common/components/Card';
import useRenderPromo from '../hooks/useRenderPromo';
import HighlightedText from '@/modules/common/components/HighlightedText';
import FieldLabel from '@/modules/common/components/FieldLabel';
import { EditPromoModal } from './EditPromoModal';
import { CancelPromoModal } from './CancelPromoModal';
import { IPromoItem } from '@/modules/cart/interfaces/ICart';

interface IProps {
  promosItems: IPromoItem[];
  salesMode?: boolean;
  setPromosSelected?: number;
  editButton?: boolean;
}

export default function RenderPromos({
  promosItems,
  salesMode: createMode,
  editButton,
}: IProps) {
  const {
    createIndex,
    handleClickAddPromo,
    handleClickConfirmVariants,
    handleSelectorChange,
    ref,
    selectedPromo,
    selectors,
  } = useRenderPromo();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-3 p-5 w-max overflow-y-scroll h-full sm:overflow-x-scroll sm:w-[90vw]">
        {promosItems?.map(({ promo }) => (
          <Card key={promo.id!}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-col">
                <HighlightedText className="text-xl">
                  {promo.name}
                </HighlightedText>
                <HighlightedText className="text-xl">
                  {formatPrice(promo.price)}
                </HighlightedText>
              </div>
              {editButton ? (
                <div className="flex flex-row gap-3">
                  <EditPromoModal promo={promo} />
                  <CancelPromoModal promoId={promo.id!} />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col justify-between p-4 gap-5">
              {promo.categories!.map(({ category, quantity }, index) => (
                <p key={index} className="text-xl list-item whitespace-nowrap">
                  {quantity} - {category.name}
                </p>
              ))}
              {promo.variants.map(({ variant, quantity }, index) => (
                <p key={index} className="text-xl list-item whitespace-nowrap">
                  {quantity} - {variant.product.name} - {variant.name}
                </p>
              ))}
            </div>
            <RenderIf condition={createMode}>
              <button
                className="btn btn-success"
                onClick={handleClickAddPromo(promo)}
              >
                Agregar
              </button>
            </RenderIf>
          </Card>
        ))}
        <dialog ref={ref} className="bg-transparent p-5">
          <div className="modal-box w-fit">
            <p className="text-xl mb-5">Elegir productos</p>
            <div className="flex flex-col gap-5">
              {selectedPromo?.categories?.map(
                ({ category, quantity }, categoryIndex) =>
                  range(quantity).map((_, quantityIndex) => (
                    <FieldLabel columnMode title={`${category.name}: `}>
                      <select
                        className="select select-bordered w-96"
                        key={createIndex({ categoryIndex, quantityIndex })}
                        value={
                          selectors[
                            createIndex({ categoryIndex, quantityIndex })
                          ] || category.variants[0].id!
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
                    </FieldLabel>
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
      </div>
    </section>
  );
}

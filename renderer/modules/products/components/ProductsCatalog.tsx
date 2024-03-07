import Loader from '@/modules/common/components/Loader';
import { useProductsProps } from '../hooks/useProductsProps';
import SearchInput from '@/modules/common/components/SearchInput';
import { ProductItemMobile } from './ProductItemMobile';
import { CartMenu } from '@/modules/common/components/Mobile/CartMenu';
import ProductTypes from './ProductTypes';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { ButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';
import {
  getIsOrderBeingUpdated,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';

interface IProps {
  onSubmit?: () => void;
  closeUpdateMode?: () => void;
}

export const ProductsCatalog = ({ onSubmit, closeUpdateMode }: IProps) => {
  const isOrderUpdate = useOrderStore(getIsOrderBeingUpdated);
  const {
    handleSelectPage,
    products,
    promoItems,
    promoQuery,
    promos,
    searchProps,
    selectedProductType,
    setShowPromo,
    showPromo,
    paginationControls,
    totalPages,
  } = useProductsProps();

  if (promoQuery.isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full flex flex-col mt-10 gap-3 p-3 md:mt-0">
      <RenderIf condition={isOrderUpdate}>
        <div className="w-full flex justify-center">
          <button className="btn w-max btn-error" onClick={closeUpdateMode}>
            Cancelar edición
          </button>
        </div>
      </RenderIf>
      <div className="w-full flex flex-row justify-between gap-5 ">
        <div className="flex flex-col w-full gap-5">
          <div
            className={
              'flex flex-row items-center justify-between p-3 gap-5 bg-base-100 sticky top-24 md:z-0 z-30 md:top-0'
            }
          >
            <SearchInput {...searchProps} />
            <ProductTypes
              setShowPromo={setShowPromo}
              showPromo={showPromo}
              onSelect={handleSelectPage}
              selectedProductType={selectedProductType?.id!}
            />
            <CartMenu
              promoItems={promoItems}
              onSubmit={onSubmit}
              closeUpdateMode={closeUpdateMode!}
            />
          </div>
          <div className="sm:grid-cols-2 sm:grid xl:grid-cols-3 sm:justify-start sm:flex-wrap gap-5">
            <RenderIf condition={!showPromo}>
              {products.map((product) => (
                <ProductItemMobile key={product.id} product={product} />
              ))}
            </RenderIf>
            <RenderIf condition={showPromo}>
              <RenderPromos
                promosItems={promos!.map((promo) => ({
                  promo,
                  selectedVariants: [],
                }))}
                salesMode
              />
            </RenderIf>
          </div>
          <RenderIf condition={!showPromo}>
            <ButtonPagination {...paginationControls} />
          </RenderIf>
        </div>
      </div>
    </section>
  );
};

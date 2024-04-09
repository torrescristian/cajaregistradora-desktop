import Loader from '@/modules/common/components/atoms/Loader';
import { useProductsProps } from '../hooks/useProductsProps';
import SearchInput from '@/modules/common/components/molecules/SearchInput';
import { ProductItemMobile } from './ProductItemMobile';
import ProductTypes from './ProductTypes';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';
import { Pagination } from '@/modules/common/components/molecules/Pagination';
import {
  getHideProductCatalog,
  getIsOrderBeingUpdated,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import CartReview from '@/modules/cart/components/organisms/CartReview';
import {
  getClearCart,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

export const ProductsCatalog = () => {
  const {
    handleSelectPage,
    products,
    promoQuery,
    promos,
    searchProps,
    selectedProductType,
    setShowPromo,
    showPromo,
    paginationControls,
  } = useProductsProps();
  const isOrderUpdate = useOrderStore(getIsOrderBeingUpdated);
  const hideProductCatalog = useOrderStore(getHideProductCatalog);
  const clearCart = useCartStore(getClearCart);

  const handleClickGoBack = () => {
    clearCart();
    hideProductCatalog();
  };

  if (promoQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full flex flex-col gap-4 md:mt-0">
      <div className="w-full flex justify-center">
        {isOrderUpdate ? (
          <button className="btn btn-error w-96" onClick={handleClickGoBack}>
            <XMarkIcon className="w-5 h-5" /> Cancelar edición
          </button>
        ) : (
          <button className="btn btn-error w-96" onClick={handleClickGoBack}>
            <ArrowLeftIcon className="w-5 h-5" /> Volver
          </button>
        )}
      </div>
      <div className="w-full flex flex-row justify-between gap-5 ">
        <div className="flex flex-col w-full gap-5">
          <div
            className={
              'flex flex-row items-center justify-between px-4 gap-5 bg-base-100 sticky top-24 md:z-0 z-30 md:top-0'
            }
          >
            <SearchInput {...searchProps} />
            <ProductTypes
              setShowPromo={setShowPromo}
              showPromo={showPromo}
              onSelect={handleSelectPage}
              selectedProductType={selectedProductType?.id!}
            />
          </div>
          <div className="flex gap-10">
            <div className="sm:grid-cols-2 sm:grid xl:grid-cols-3 sm:justify-start sm:flex-wrap gap-4">
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
            <CartReview />
          </div>
          <RenderIf condition={!showPromo}>
            <Pagination {...paginationControls} />
          </RenderIf>
        </div>
      </div>
    </section>
  );
};

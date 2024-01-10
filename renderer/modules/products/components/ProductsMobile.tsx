import Loader from '@/modules/common/components/Loader';
import { useProductsProps } from '../hooks/useProductsProps';
import SearchInput from '@/modules/common/components/SearchInput';
import { ProductItemMobile } from './ProductItemMobile';
import { CartIconMobile } from '@/modules/common/components/Mobile/CartIconMobile';
import ProductTypes from './ProductTypes';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';
import Pagination from '@/modules/common/components/Pagination';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { ButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  closeUpdateMode?: () => void;
}

export const ProductsMobile = ({
  updateMode,
  order,
  onSubmit,
  closeUpdateMode,
}: IProps) => {
  const isMobile = useIsMobile();
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
      <RenderIf condition={updateMode}>
        <div className="w-full flex justify-center">
          <button className="btn w-max btn-error" onClick={closeUpdateMode}>
            Dejar de editar
          </button>
        </div>
      </RenderIf>
      <div
        className={
          'flex flex-row items-center justify-between p-3 gap-5 bg-base-100 sticky top-24 md:z-0 z-30 md:top-0'
        }
      >
        {isMobile ? (
          <div>
            <ProductTypes
              setShowPromo={setShowPromo}
              showPromo={showPromo}
              onSelect={handleSelectPage}
              selectedProductType={selectedProductType?.id!}
            />
            <SearchInput {...searchProps} />
            <CartIconMobile
              updateMode={updateMode}
              order={order}
              onSubmit={onSubmit}
              promoItems={promoItems}
              closeUpdateMode={closeUpdateMode!}
            />
          </div>
        ) : (
          <>
            <SearchInput {...searchProps} />
            <ProductTypes
              setShowPromo={setShowPromo}
              showPromo={showPromo}
              onSelect={handleSelectPage}
              selectedProductType={selectedProductType?.id!}
            />
            <CartIconMobile
              updateMode={updateMode}
              order={order}
              promoItems={promoItems}
              onSubmit={onSubmit}
              closeUpdateMode={closeUpdateMode!}
            />
          </>
        )}
      </div>
      <div className="sm:grid-cols-2 sm:grid xl:grid-cols-4 sm:justify-center sm:flex-wrap gap-5">
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
    </section>
  );
};

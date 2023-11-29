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
    promos,
    handleNextPage,
    handleSelectPage,
    products,
    showPromo,
    productsQuery,
    promoQuery,
    searchProps,
    selectedProductType,
    setShowPromo,
  } = useProductsProps();

  if (promoQuery.isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full flex flex-col mt-20 gap-3 p-3 md:mt-0">
      {updateMode ? (
        <div className="w-full flex justify-center">
          <button className="btn w-max btn-error" onClick={closeUpdateMode}>
            Dejar de editar
          </button>
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-between p-3 gap-5">
        {isMobile ? (
          <>
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
              closeUpdateMode={closeUpdateMode!}
            />
          </>
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
              onSubmit={onSubmit}
              closeUpdateMode={closeUpdateMode!}
            />
          </>
        )}
      </div>
      <div className="md:flex md:flex-row md:justify-center md:flex-wrap gap-5">
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
      <Pagination
        pagination={productsQuery.pagination}
        onClick={handleNextPage}
        isLoading={productsQuery.isLoading}
      />
    </section>
  );
};

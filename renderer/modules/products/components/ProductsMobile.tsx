import Loader from '@/modules/common/components/Loader';
import { useProductsProps } from '../hooks/useProductsProps';
import SearchInput from '@/modules/common/components/SearchInput';
import { ProductItemMobile } from './ProductItemMobile';
import { CartIconMobile } from '@/modules/common/components/Mobile/CartIconMobile';
import ProductTypes from './ProductTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';
import Pagination from '@/modules/common/components/Pagination';

export const ProductsMobile = () => {
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
    <section className="w-full flex flex-col mt-16">
      <div className="flex flex-row items-center justify-between p-3 gap-5">
        <ProductTypes
          setShowPromo={setShowPromo}
          showPromo={showPromo}
          onSelect={handleSelectPage}
          selectedProductType={selectedProductType?.id!}
        />
        <SearchInput {...searchProps} />
        <CartIconMobile />
      </div>
      <div>
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

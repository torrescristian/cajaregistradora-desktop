import ProductItem from '@/modules/products/components/ProductItem';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import SearchInput from '@/modules/common/components/SearchInput';
import Loader from '@/modules/common/components/Loader';
import ProductTypes from './ProductTypes';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';

import Pagination from '@/modules/common/components/Pagination';
import { useProductsProps } from '../hooks/useProductsProps';
import { ButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';

const Navigation = ({ children }: IComponent) => (
  <section className="flex w-full justify-center items-center flex-col sm:flex-row gap-5">
    {children}
  </section>
);

const Products = () => {
  const {
    promos,
    handleNextPage,
    handleSelectPage,
    products,
    showPromo,
    variantsQuery,
    promoQuery,
    searchProps,
    selectedProductType,
    setShowPromo,
    totalPages,
    paginationControls,
  } = useProductsProps();

  if (promoQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full">
      <Navigation>
        <SearchInput {...searchProps} />
        <ProductTypes
          setShowPromo={setShowPromo}
          showPromo={showPromo}
          onSelect={handleSelectPage}
          selectedProductType={selectedProductType?.id!}
        />
      </Navigation>
      <section className="flex flex-row gap-5 m-5 p-2 overflow-x-scroll w-full">
        {variantsQuery.isLoading && <Loader />}
        {variantsQuery.isError && <p>Error</p>}
        <RenderIf condition={!showPromo}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
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
      </section>
      <ButtonPagination {...paginationControls} />
    </section>
  );
};

export default Products;

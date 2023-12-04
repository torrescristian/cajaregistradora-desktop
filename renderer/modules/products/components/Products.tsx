import ProductItem from '@/modules/products/components/ProductItem';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import SearchInput from '@/modules/common/components/SearchInput';
import Loader from '@/modules/common/components/Loader';
import ProductTypes from './ProductTypes';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';

import Pagination from '@/modules/common/components/Pagination';
import { useProductsProps } from '../hooks/useProductsProps';

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
    productsQuery,
    promoQuery,
    searchProps,
    selectedProductType,
    setShowPromo,
    totalPages,
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
        {productsQuery.isLoading && <Loader />}
        {productsQuery.isError && <p>Error</p>}
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
      <Pagination
        pagination={totalPages!}
        onClick={handleNextPage}
        isLoading={productsQuery.isLoading}
      />
    </section>
  );
};

export default Products;

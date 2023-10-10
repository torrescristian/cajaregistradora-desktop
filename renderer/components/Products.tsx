import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct, PRODUCT_TYPE } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import ProductTypes from './ProductTypes';
import { useState } from 'react';
import { Divider } from './Sale/Sale.styles';
import { RenderIf } from './RenderIf';
import RenderPromos from './Promo/RenderPromo';
import usePromoQuery from '@/hooks/services/usePromoQuery';
import { IPromo } from '@/interfaces/IPromo';

const Navigation = ({ children }: IComponent) => (
  <section className="flex w-full justify-center flex-row gap-5">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const [showPromo, setShowPromo] = useState(false);
  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;

  const [selectedProductType, setSelectedProductType] =
    useState<PRODUCT_TYPE>('');

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType,
  });

  const products = productsQuery.products as IProduct[];

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
          onSelect={setSelectedProductType}
          selectedProductType={selectedProductType}
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
    </section>
  );
};

export default Products;

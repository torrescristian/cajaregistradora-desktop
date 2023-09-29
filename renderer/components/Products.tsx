import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct, PRODUCT_TYPE } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import ProductTypes from './ProductTypes';
import { useState } from 'react';
import { Divider } from './Sale/Sale.styles';

const Fixed = ({ children }: IComponent) => (
  <section className="sticky top-0 z-20 flex w-full justify-center flex-row gap-5">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const [selectedProductType, setSelectedProductType] =
    useState<PRODUCT_TYPE>('');

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType,
  });

  const products = productsQuery.products as IProduct[];

  return (
    <section className="w-full">
      <Divider>Productos</Divider>
      <Fixed>
        <SearchInput {...searchProps} />
        <ProductTypes
          onSelect={setSelectedProductType}
          selectedProductType={selectedProductType}
        />
      </Fixed>
      <section className="flex flex-row gap-5 m-5 p-2 overflow-x-scroll w-full">
        {productsQuery.isLoading && <Loader />}
        {productsQuery.isError && <p>Error</p>}
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default Products;

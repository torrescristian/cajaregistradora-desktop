import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import ProductTypes from './ProductTypes';

const Fixed = ({ children }: IComponent) => (
  <section className="sticky top-0 z-20 mt-2.5 flex w-full flex-col gap-y-5 py-2">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedCategories: searchProps.selectedCategories,
  });

  const products = productsQuery.products as IProduct[];

  return (
    <section className="w-full">
      <Fixed>
        <SearchInput {...searchProps} />
        <ProductTypes />
      </Fixed>
      <section className=" flex flex-row gap-5 m-5 overflow-x-scroll w-[60vw]">
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

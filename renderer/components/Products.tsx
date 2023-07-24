import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import IProductUI from '@/interfaces/IProduct';
import Loader from '@/components/Loader';

const Fixed = ({ children }: IComponent) => (
  <section className="sticky top-0 z-20 mt-2.5 flex w-full flex-col gap-y-5 bg-white">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedCategories: searchProps.selectedCategories,
  });

  const products = productsQuery.products as IProductUI[];

  return (
    <section className="w-1/2">
      <Fixed>
        <SearchInput {...searchProps} />
      </Fixed>
      <section className="mt-5 flex w-full flex-row flex-wrap justify-between gap-y-5">
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

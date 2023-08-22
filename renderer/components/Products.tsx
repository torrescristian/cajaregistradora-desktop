import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import IProductUI from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import SelectClient from './SelectClient';

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

  const products = productsQuery.products as IProductUI[];

  return (
    <section className="w-full">
      <Fixed>
        <SearchInput {...searchProps} />
        
      </Fixed>
      <section className=" flex w-full flex-row gap-2 flex-wrap justify-start  ">
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

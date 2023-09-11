import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import ProductTypes from './ProductTypes';

const Fixed = ({ children }: IComponent) => (
  <section className="sticky top-0 z-20 flex w-full justify-center flex-row gap-5">
    {children}
  </section>
);

interface IProps {
  updateMode:boolean;
}

const Products = ({updateMode}:IProps) => {
  const searchProps = useSearchProps();

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedCategories: [],
  });

  const products = productsQuery.products as IProduct[];

  return (
    <section className="w-full">
      <Fixed>
        <SearchInput {...searchProps} />
        <ProductTypes />
      </Fixed>
      <section className="flex flex-row gap-5 m-5 p-2 overflow-x-scroll w-full">
        {productsQuery.isLoading && <Loader />}
        {productsQuery.isError && <p>Error</p>}
        {products.map((product) => (
          <ProductItem key={product.id} product={product} updateMode />
        ))}
      </section>
    </section>
  );
};

export default Products;

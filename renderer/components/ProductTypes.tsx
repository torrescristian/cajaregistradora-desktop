import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct } from '@/interfaces/IProduct';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import { Badge } from './ProductItem.styles';

type IProductsBySection = {
  [section: string]: IProduct[];
};

export default function ProductTypes() {
  const productsQuery = useProductsQuery({
    query: '',
    selectedCategories: [],
  });

  if (productsQuery.isLoading) return <Loader />;

  if (productsQuery.isError)
    return <ErrorMessage>{productsQuery.error}</ErrorMessage>;

  const productsByTypesMap = productsQuery.products.reduce((acc, curr) => {
    return acc.set(curr.type, [...(acc.get(curr.type) || []), curr]);
  }, new Map());

  const productsByTypes = Array.from(productsByTypesMap.entries()).map(
    ([type, products]) => ({ type, products }),
  );

  return (
    <section className="flex flex-row gap-5">
      {productsByTypes.map(({ type, products }) => (
        <div className="flex flex-row items-center gap-2 btn btn-outline btn-accent" key={type}>
          <span>{type}</span>
        </div>
      ))}
    </section>
  );
}

import { IProduct, IProductPage } from '@/interfaces/IProduct';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import Pagination from './subcomponents/Pagination';
import ProductRow from './subcomponents/ProductRow';

interface IProps {
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
  setActivePage: (page: number) => void;
  pagination: IProductPage['pagination'];
}

export default function ProductTable({
  products,
  isLoading,
  isError,
  pagination,
  setActivePage,
}: IProps) {
  const handleClickPage = (page: number) => () => setActivePage(page);

  return (
    <section className="flex flex-col gap-5">
      <section className="flex gap-5">
        {isLoading && <Loader className="w-full text-center" />}
        {isError && <ErrorMessage>Error</ErrorMessage>}
        {!isLoading &&
          products.map((p) => <ProductRow product={p} key={p.id} />)}
      </section>

      <Pagination
        pagination={pagination}
        onClick={handleClickPage}
        isLoading={isLoading}
      />
    </section>
  );
}

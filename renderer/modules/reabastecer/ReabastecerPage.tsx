import { useState } from 'react';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import PageLayout from '@/modules/common/components/PageLayout';
import { ButtomUpdatePrice } from '@/modules/reabastecer/components/ButtomUpdatePrice';
import Loader from '@/modules/common/components/Loader';
import ErrorMessage from '@/modules/common/components/ErrorMessage';
import { useVariantUpdateTableProps } from '@/modules/reabastecer/hooks/useVariantUpdateTableProps';
import VariantUpdateTable from './components/VariantUpdateTable';
import NoMobileVersion from '../common/components/NoMobileVersion';

export default function ReabastecerPage() {
  const searchProps = useSearchProps();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    page: activePage,
    pageSize,
  });
  const products = productsQuery.products || [];
  const totalPages = productsQuery.pagination || [];
  const tableInstance = useVariantUpdateTableProps({
    products,
  });

  const handleChangeVisibilityProduct = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault()
    setPageSize(Number(e.target.value));
  };

  return (
    <PageLayout>
      <h1 className="text-2xl whitespace-nowrap">Reabastecer & Actualizar</h1>
      <NoMobileVersion />
      <div className="flex flex-row justify-between gap-10 w-full">
        <SearchInput {...searchProps} />
        <ButtomUpdatePrice
          variants={tableInstance
            .getSelectedRowModel()
            .flatRows.map((e) => e.original)}
        />
        {/* <select onChange={handleChangeVisibilityProduct} value={pageSize} className="select select-bordered">
          <option value={10}>Cantidad de productos visibles</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select> */}
      </div>
      <section className="flex w-full justify-center ">
        {productsQuery.isLoading && <Loader />}
        {productsQuery.isError && <ErrorMessage>Error</ErrorMessage>}
        {!productsQuery.isLoading && !productsQuery.isError && (
          <VariantUpdateTable tableInstance={tableInstance} />
        )}
      </section>
    </PageLayout>
  );
}

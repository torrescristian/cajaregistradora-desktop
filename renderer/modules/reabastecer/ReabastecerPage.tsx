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

export default function ReabastecerPage() {
  const searchProps = useSearchProps();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

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
    setPageSize(Number(e.target.value));
  };

  return (
    <PageLayout>
      <h1 className="text-2xl whitespace-nowrap">Reabastecer & Actualizar</h1>
      <div className="flex flex-row justify-between gap-10 w-full">
        <SearchInput {...searchProps} />
        <ButtomUpdatePrice
          variants={tableInstance
            .getSelectedRowModel()
            .flatRows.map((e) => e.original)}
        />
        <select
          className="select select-bordered"
          value={pageSize}
          onChange={handleChangeVisibilityProduct}
        >
          <option>Cantidad de productos visibles</option>
          <option>15</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
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

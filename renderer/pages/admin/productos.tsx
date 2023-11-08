import PageLayout from '@/components/PageLayout';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useIsMobile from '@/hooks/useIsMobile';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useState } from 'react';
import VariantUpdateTable from '@/components/VariantUpdateTable/VariantUpdateTable';
import { ButtomUpdatePrice } from '@/components/VariantUpdateTable/components/ButtomUpdatePrice';
import { useVariantUpdateTableProps } from '@/components/VariantUpdateTable/hooks/useVariantUpdateTableProps';

const Productos = () => {
  const searchProps = useSearchProps();
  const [activePage, setActivePage] = useState(1);

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    page: activePage,
  });
  const tableInstance = useVariantUpdateTableProps(productsQuery);
  const isMobile = useIsMobile();

  return (
    <PageLayout>
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl whitespace-nowrap">Reabastecer & Actualizar</h1>
        <ButtomUpdatePrice
          variants={tableInstance
            .getSelectedRowModel()
            .flatRows.map((e) => e.original)}
        />
        <SearchInput {...searchProps} />
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
};

export default Productos;

import PageLayout from '@/components/PageLayout';
import ProductTable from '@/components/ProductTable';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useIsMobile from '@/hooks/useIsMobile';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useState } from 'react';
import EditableCollapse from '@/components/EditableCollapse';
import VariantUpdateTable from '@/components/ProductTable/subcomponents/VariantUpdateTable';

const Productos = () => {
  const searchProps = useSearchProps();
  const [activePage, setActivePage] = useState(1);

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    page: activePage,
  });

  const isMobile = useIsMobile();

  return (
    <PageLayout className="w-full">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl whitespace-nowrap">Reabastecer & Actualizar</h1>
        <SearchInput {...searchProps} />
      </div>
      <section className="flex w-full">
        {isMobile ? (
          <>
            {productsQuery.isLoading && <Loader />}
            {productsQuery.isError && <ErrorMessage>Error</ErrorMessage>}
            {productsQuery.products.map((product) => (
              <EditableCollapse key={product.id} product={product} />
            ))}
          </>
        ) : (

          <VariantUpdateTable
            isLoading={productsQuery.isLoading}
            isError={productsQuery.isError}
            products={productsQuery.products}
            setActivePage={setActivePage}
            pagination={productsQuery.pagination}
          />
          /*           <ProductTable
                      isLoading={productsQuery.isLoading}
                      isError={productsQuery.isError}
                      products={productsQuery.products}
                      setActivePage={setActivePage}
                      pagination={productsQuery.pagination}
                    />*/
        )}
      </section>
    </PageLayout>
  );
};

export default Productos;

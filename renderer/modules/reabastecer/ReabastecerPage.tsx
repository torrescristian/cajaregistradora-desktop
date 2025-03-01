import { useEffect, useState } from 'react';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import PageLayout from '@/modules/common/components/PageLayout';
import { BatchPriceSection } from '@/modules/reabastecer/components/BatchPriceSection';
import Loader from '@/modules/common/components/Loader';
import ErrorMessage from '@/modules/common/components/ErrorMessage';
import { useVariantUpdateTableProps } from '@/modules/reabastecer/hooks/useVariantUpdateTableProps';
import UpdateVariantTable from './components/UpdateVariantTable';
import NoMobileVersion from '../common/components/NoMobileVersion';
import useVariantsQuery from './hooks/useVariantsQuery';
import {
  useButtonPagination,
  ButtonPagination,
} from './components/ButtonPagination';

export default function ReabastecerPage() {
  const paginationControls = useButtonPagination();
  const searchProps = useSearchProps();
  const variantsQuery = useVariantsQuery({
    query: searchProps.query,
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  const variants = variantsQuery.data?.variants || [];

  const tableInstance = useVariantUpdateTableProps(variants);

  return (
    <PageLayout>
      <h1 className="text-2xl whitespace-nowrap">Reabastecer & Actualizar</h1>
      <NoMobileVersion />
      <div className="flex flex-col items-center gap-10 w-full">
        <SearchInput {...searchProps} className="w-[70vw]" />
        <BatchPriceSection
          variants={tableInstance
            .getSelectedRowModel()
            .flatRows.map((e) => e.original)}
        />
      </div>
      <section className="flex flex-col gap-10 w-full justify-center ">
        {variantsQuery.isLoading && <Loader />}
        {variantsQuery.isError && <ErrorMessage>Error</ErrorMessage>}
        {!variantsQuery.isLoading && !variantsQuery.isError && (
          <UpdateVariantTable tableInstance={tableInstance} />
        )}
        <ButtonPagination {...paginationControls} />
      </section>
    </PageLayout>
  );
}

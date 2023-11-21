import { useState } from "react";
import SearchInput, { useSearchProps } from "@/modules/common/components/SearchInput";
import useProductsQuery from "@/modules/products/hooks/useProductsQuery";
import useIsMobile from "@/modules/reabastecer/hooks/useIsMobile";
import PageLayout from "@/modules/common/components/PageLayout";
import { ButtomUpdatePrice } from "@/modules/reabastecer/components/ButtomUpdatePrice";
import Loader from "@/modules/common/components/Loader";
import ErrorMessage from "@/modules/common/components/ErrorMessage";
import { useVariantUpdateTableProps } from "@/modules/reabastecer/hooks/useVariantUpdateTableProps";
import VariantUpdateTable from "./components/VariantUpdateTable";

export default function () {

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
    )
}
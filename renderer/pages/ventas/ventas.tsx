import PageLayout from "@/components/PageLayout";
import useSalesQuery from "@/hooks/services/useSalesQuery";
import Loader from "@/components/Loader";
import Sale from "@/components/Sale";
import InfiniteScroll from "react-infinite-scroll-component";

const Ventas = () => {
  const salesQuery = useSalesQuery();

  if (salesQuery.isLoading)
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );

  if (salesQuery.isError)
    return (
      <PageLayout>
        <p>Error</p>
      </PageLayout>
    );

  return (
    <PageLayout className="w-screen">
      <h1 className="bold text-2xl">📊 últimas ventas</h1>
      <p>Encontrá acá tus ventas más recientes</p>
      <InfiniteScroll
          dataLength={salesQuery.sales.length || 0}
          next={() => salesQuery.fetchNextPage()}
          hasMore={!!salesQuery.hasNextPage}
          loader={<Loader />}
        >
        <section className="grid grid-cols-3 gap-5">
          {salesQuery.sales.map((sale) => {
            return <Sale sale={sale} key={sale.id} />;
          })}
        </section>
      </InfiniteScroll>
    </PageLayout>
  );
};

export default Ventas;

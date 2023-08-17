import Loader from '@/components/Loader';
import Order from '@/components/Order';
import useOrderQuery from '@/hooks/services/useOrderQuery';

function ordenes() {
  const orderQuery = useOrderQuery();
  if (orderQuery.isLoading) {
    return <Loader />;
  }
  if (orderQuery.isError) {
    return <p>Error</p>;
  }
  return (
    <section className="flex flex-col items-center w-4/5 gap-5">
      <h1 className="text-2xl font-bold">✍🏻 Lista de ordenes</h1>

      {orderQuery.data.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </section>
  );
}

export default ordenes;

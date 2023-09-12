import Loader from '@/components/Loader';
import Order from '@/components/Order';
import useOrderQuery from '@/hooks/services/useOrderQuery';
import { IOrder } from '@/interfaces/IOrder';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import { useState } from 'react';

const Wrapper = ({ children }: IComponent) => (
  <section className="flex flex-col items-center w-4/5 gap-5">
    <h1 className="text-2xl font-bold">✍🏻 Lista de ordenes</h1>
    {children}
  </section>
);

function ordenes() {
  const [orderToUpdate, setOrderToUpdate] = useState<IOrder | null>(null);
  const updateMode = !!orderToUpdate;
  const orderQuery = useOrderQuery();

  if (orderQuery.isLoading) {
    return <Loader />;
  }

  if (orderQuery.isError) {
    return <p>Error</p>;
  }

  if (updateMode) {
    return (
      <Wrapper>
        <Order
          order={orderToUpdate}
          updateMode
          onSubmit={() => {
            setOrderToUpdate(null);
          }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {orderQuery.data.map((order) => (
        <Order
          key={order.id}
          order={order}
          onSubmit={(order) => setOrderToUpdate(order)}
        />
      ))}
    </Wrapper>
  );
}

export default ordenes;

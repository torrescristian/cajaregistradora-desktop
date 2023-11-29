import { useState } from 'react';
import useOrderQuery from './hooks/useOrderQuery';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import Loader from '@/modules/common/components/Loader';
import Order from './components/Order';

const Wrapper = ({ children }: IComponent) => (
  <section className="flex flex-col items-start mt-20 p-5 sm:mt-2 gap-2">
    <h1 className="text-2xl font-bold">✍🏻 Lista de ordenes</h1>
    {children}
  </section>
);

export default function OrdenesPage() {
  const [orderToUpdate, setOrderToUpdate] = useState<IOrder | null>(null);
  const updateMode = !!orderToUpdate;
  const orderQuery = useOrderQuery();

  const closeUpdateMode = () => {
    setOrderToUpdate(null);
  };

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
          closeUpdateMode={closeUpdateMode}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <section className="w-full sm:flex-row flex-col flex gap-5 overflow-y-scroll sm:overflow-x-scroll">
        {orderQuery.data.map((order) => (
          <Order
            key={order.id}
            order={order}
            onSubmit={(order) => setOrderToUpdate(order)}
            closeUpdateMode={closeUpdateMode}
          />
        ))}
      </section>
    </Wrapper>
  );
}

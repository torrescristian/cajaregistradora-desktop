import { useState } from 'react';
import useOrderQuery from './hooks/useOrderQuery';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import Loader from '@/modules/common/components/Loader';
import OrderTable from './components/OrderTable';
import { ProductsCatalog } from '../products/components/ProductsCatalog';
import {
  ButtonPagination,
  useButtonPagination,
} from '../reabastecer/components/ButtonPagination';

const Wrapper = ({ children }: IComponent) => (
  <section className="flex flex-col mt-20 p-3 sm:mt-2 gap-9">
    <h1 className="text-2xl font-bold text-center">✍🏻 Lista de ordenes</h1>
    {children}
  </section>
);

export default function OrdenesPage() {
  const paginationControls = useButtonPagination();
  const [orderToUpdate, setOrderToUpdate] = useState<IOrder | null>(null);
  const updateMode = !!orderToUpdate;
  const orderQuery = useOrderQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

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
        <ProductsCatalog
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
      <section className="w-full flex flex-col gap-5">
        <OrderTable
          orders={orderQuery.data.orders}
          setOrderToUpdate={setOrderToUpdate}
        />
        <ButtonPagination {...paginationControls} />
      </section>
    </Wrapper>
  );
}

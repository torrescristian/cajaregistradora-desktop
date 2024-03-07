import { useButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';
import Loader from '@/modules/common/components/Loader';
import { getErrorMessage } from '@/modules/common/libs/utils';
import ErrorMessage from '@/modules/common/components/ErrorMessage';

import useOrderQuery from '../../hooks/useOrderQuery';
import { ButtonAdd } from '../atoms/ButtonAdd';
import OrderCard from '../molecules/OrderCard';
import {
  getCreateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';

export default function OrdersColumn() {
  const createTakeAway = useOrderStore(getCreateTakeAway);
  const paginationControls = useButtonPagination();

  const orderQuery = useOrderQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  if (orderQuery.isLoading) {
    return <Loader />;
  }

  if (orderQuery.isError) {
    return <ErrorMessage>{getErrorMessage(orderQuery.error)}</ErrorMessage>;
  }

  return (
    <div className="flex flex-col w-full item-center gap-3 px-5">
      <h1 className="whitespace-nowrap">Pedidos a retirar</h1>
      <ButtonAdd onClick={createTakeAway} />
      <div className="grid grid-cols-2 gap-4">
        {orderQuery.data.orders.map((o) => (
          <OrderCard order={o} />
        ))}
      </div>
    </div>
  );
}

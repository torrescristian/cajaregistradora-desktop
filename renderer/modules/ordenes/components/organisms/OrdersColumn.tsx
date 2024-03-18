import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import { usePagination } from '@/modules/common/components/molecules/Pagination';
import { getErrorMessage } from '@/modules/common/libs/utils';
import ErrorMessage from '@/modules/common/components/atoms/ErrorMessage';
import {
  getCreateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';

import useOrderQuery from '../../hooks/useOrderQuery';
import { ButtonAdd } from '../atoms/ButtonAdd';
import OrderCard from '../molecules/OrderCard';

export default function OrdersColumn() {
  const createTakeAway = useOrderStore(getCreateTakeAway);
  const paginationControls = usePagination();

  const orderQuery = useOrderQuery(paginationControls);

  if (orderQuery.isError) {
    return <ErrorMessage>{getErrorMessage(orderQuery.error)}</ErrorMessage>;
  }

  return (
    <div className="flex flex-col w-full item-center gap-3 px-5">
      <h2 className="text-lg whitespace-nowrap">Pedidos a retirar</h2>
      <ButtonAdd onClick={createTakeAway} />
      <div className="grid grid-cols-2 gap-4">
        {orderQuery.data?.orders.map((o) => <OrderCard key={o.id} order={o} />)}
        <RenderIf condition={orderQuery.isLoading}>
          <div className="skeleton w-full h-10 col-span-2"></div>
        </RenderIf>
      </div>
    </div>
  );
}

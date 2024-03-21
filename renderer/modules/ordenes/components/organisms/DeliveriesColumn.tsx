import {
  getCreateDelivery,
  getSetDelivery,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { usePagination } from '@/modules/common/components/molecules/Pagination';
import { getErrorMessage } from '@/modules/common/libs/utils';
import ErrorMessage from '@/modules/common/components/atoms/ErrorMessage';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';

import { ButtonAdd } from '../atoms/ButtonAdd';
import useDeliveriesQuery from '../../hooks/useDeliveriesQuery';
import { IOrder } from '../../interfaces/IOrder';
import DeliveryOrderCard from '../molecules/DeliveryOrderCard';

export default function DeliveriesColumn() {
  const setDelivery = useOrderStore(getSetDelivery);
  const createDelivery = useOrderStore(getCreateDelivery);

  const paginationControls = usePagination();

  const deliveriesQuery = useDeliveriesQuery(paginationControls);

  if (deliveriesQuery.isError) {
    return (
      <ErrorMessage>{getErrorMessage(deliveriesQuery.error)}</ErrorMessage>
    );
  }

  const handleClickCreateDelivery = () => {
    setDelivery(null);
    createDelivery();
  };

  return (
    <div className="flex flex-col w-full item-center gap-3 px-5">
      <h2 className="text-lg">Deliveries</h2>
      <ButtonAdd onClick={handleClickCreateDelivery} />
      <div className="grid grid-cols-2 gap-4">
        {deliveriesQuery.data?.orders.map((o: IOrder) => (
          <DeliveryOrderCard key={o.id} order={o} />
        ))}
        <RenderIf condition={deliveriesQuery.isLoading}>
          <div className="skeleton w-full h-10 col-span-2"></div>
        </RenderIf>
      </div>
    </div>
  );
}

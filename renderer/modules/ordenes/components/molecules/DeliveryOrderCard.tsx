import { formatPrice } from '@/modules/common/libs/utils';

import { IOrder } from '../../interfaces/IOrder';
import { CancelOrderModal } from '../organisms/CancelOrderModal';
import { ConfirmOrderModal } from '../organisms/ConfirmOrderModal';
import { EditOrderModal } from '../organisms/EditOrderModal';
import { MapPinIcon, UserIcon } from '@heroicons/react/24/solid';

interface IProps {
  order: IOrder;
}

export default function DeliveryOrderCard({ order }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-lg p-4 border-neutral">
      <p className="flex gap-2">
        <UserIcon className="w-5 h-5" />
        {order.delivery?.userName || order.delivery?.client?.name || '🫥'}
      </p>
      <p className="flex gap-2">
        <MapPinIcon className="w-5 h-5" />
        {order.delivery?.userAddress || order.delivery?.client?.address || ''}
      </p>
      <p className="text-left">Total: {formatPrice(order.totalPrice)}</p>
      <div className="flex justify-center gap-2">
        <ConfirmOrderModal order={order} />
        <EditOrderModal order={order} />
        <CancelOrderModal order={order} />
      </div>
    </div>
  );
}

import { formatPrice } from '@/modules/common/libs/utils';
import { MapPinIcon, UserIcon } from '@heroicons/react/24/solid';

import { DELIVERY_STATUS } from '@/modules/cart/interfaces/IDelivery';

import { IOrder } from '../../interfaces/IOrder';
import { CancelOrderModal } from '../organisms/CancelOrderModal';
import NextStepDeliveryButton from './NextStepDeliveryButton';
import { ConfirmOrderModal } from '../organisms/ConfirmOrderModal';
import { EditDeliveryModal } from '../organisms/EditDeliveryModal';

interface IProps {
  order: IOrder;
}

export default function DeliveryOrderCard({ order }: IProps) {
  return (
    <div className="flex flex-col justify-between gap-4 border-2 rounded-lg p-4 border-neutral">
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
        {order.delivery?.status === DELIVERY_STATUS.PENDING && (
          <>
            <NextStepDeliveryButton order={order} />
            <EditDeliveryModal order={order} />
            <CancelOrderModal order={order} />
          </>
        )}
        {order.delivery?.status === DELIVERY_STATUS.READY && (
          <ConfirmOrderModal order={order} />
        )}
      </div>
    </div>
  );
}

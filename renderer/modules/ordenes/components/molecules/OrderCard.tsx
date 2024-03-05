import { formatPrice } from '@/modules/common/libs/utils';
import { IOrder } from '../../interfaces/IOrder';
import { CancelOrderModal } from '../CancelOrderModal';
import { ConfirmOrderModal } from '../ConfirmOrderModal';
import { EditOrderModal } from '../EditOrderModal';

interface IProps {
  order: IOrder;
}

export default function OrderCard({ order }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-lg p-4 border-neutral">
      <p>Orden # {order.id}</p>
      <p>Total: {formatPrice(order.totalPrice)}</p>
      <div className="flex justify-center gap-2">
        <ConfirmOrderModal order={order} />
        <EditOrderModal />
        <CancelOrderModal order={order} />
      </div>
    </div>
  );
}

import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Card } from '@/modules/common/components/Card';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
interface IProps {
  order: IOrder;
  updateMode?: boolean;
  onSubmit: (order: IOrder) => void;
  closeUpdateMode: () => void;
  ordersTable?: IOrder[];
}

function Order({
  order,
  updateMode,
  onSubmit,
  closeUpdateMode,
  ordersTable,
}: IProps) {
  const createMode = !updateMode;
  const isMobile = useIsMobile();
  const handleToggleEdit = () => {
    onSubmit(order);
  };

  return (
    <Card>
      <RenderIf condition={updateMode}>
        <UpdateOrder
          order={order}
          updateMode
          onSubmit={handleToggleEdit}
          closeUpdateMode={closeUpdateMode}
        />
      </RenderIf>
    </Card>
  );
}

export default Order;

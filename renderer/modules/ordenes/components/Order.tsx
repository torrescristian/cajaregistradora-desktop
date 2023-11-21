import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { CreateTicketForm } from './CreateTicketForm';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Card } from '@/modules/common/components/Card';
interface IProps {
  order: IOrder;
  updateMode?: boolean;
  onSubmit: (order: IOrder) => void;
}

function Order({ order, updateMode, onSubmit }: IProps) {
  const createMode = !updateMode;

  const handleToggleEdit = () => {
    onSubmit(order);
  };

  return (
    <Card>
      <RenderIf condition={createMode}>
        <CreateTicketForm order={order} handleToggleEdit={handleToggleEdit} />
      </RenderIf>
      <RenderIf condition={updateMode}>
        <UpdateOrder order={order} onSubmit={handleToggleEdit} />
      </RenderIf>
    </Card>
  );
}

export default Order;

import { IOrder } from '@/interfaces/IOrder';
import { CreateTicketForm } from './CreateTicketForm';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from './RenderIf';
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
    <section className="flex shadow-2xl border-stone-100 border-2 p-5">
      <RenderIf condition={createMode}>
        <CreateTicketForm order={order} handleToggleEdit={handleToggleEdit} />
      </RenderIf>
      <RenderIf condition={updateMode}>
        <UpdateOrder order={order} onSubmit={handleToggleEdit} />
      </RenderIf>
    </section>
  );
}

export default Order;

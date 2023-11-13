import { IOrder } from '@/interfaces/IOrder';
import { CreateTicketForm } from './CreateTicketForm';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from './RenderIf';
import { Card } from './Card';
import { getClearCart, useCartStore } from '@/contexts/CartStore';
interface IProps {
  order: IOrder;
  updateMode?: boolean;
  onSubmit: (order: IOrder) => void;
}

function Order({ order, updateMode, onSubmit }: IProps) {
  const createMode = !updateMode;
  const clearCart = useCartStore(getClearCart);
  
  const handleToggleEdit = () => {
    onSubmit(order);
    clearCart();
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

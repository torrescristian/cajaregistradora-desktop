import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { CreateTicketForm } from './CreateTicketForm';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Card } from '@/modules/common/components/Card';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { CreateTicketFormMobile } from '../../common/components/Mobile/CreateTicketFormMobile';
interface IProps {
  order: IOrder;
  updateMode?: boolean;
  onSubmit: (order: IOrder) => void;
  closeUpdateMode: () => void;
}

function Order({ order, updateMode, onSubmit, closeUpdateMode }: IProps) {
  const createMode = !updateMode;
  const isMobile = useIsMobile();
  const handleToggleEdit = () => {
    onSubmit(order);
  };

  return (
    <Card>
      <RenderIf condition={createMode}>
        {isMobile ? (
          <CreateTicketFormMobile
            order={order}
            handleToggleEdit={handleToggleEdit}
          />
        ) : (
          <CreateTicketForm order={order} handleToggleEdit={handleToggleEdit} />
        )}
      </RenderIf>
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

import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { CreateTicketForm } from './CreateTicketForm';
import { UpdateOrder } from './UpdateOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Card } from '@/modules/common/components/Card';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { CreateTicketFormMobile } from '../../common/components/Mobile/CreateTicketFormMobile';
import OrderTable from './OrderTable';
import { OrderContext } from '../context/UpdateOrderContext';
import { useContext } from 'react';
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
    <OrderContext.Provider value={{ handleToggleEdit }}>
      <Card>
        <RenderIf condition={createMode}>
          {isMobile ? (
            <CreateTicketFormMobile
              order={order}
              handleToggleEdit={handleToggleEdit}
            />
          ) : (
            <OrderTable orders={ordersTable!} />
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
    </OrderContext.Provider>
  );
}

export default Order;

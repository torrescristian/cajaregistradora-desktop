import CartMobile from '@/modules/common/components/Mobile/CartMobile';
import { useDrawerStore } from '../../contexts/useDrawerStore';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import OutsideAlerter from '../OutsideAlerter';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  closeUpdateMode: () => void;
}

export const CartDrawer = ({
  onSubmit,
  order,
  updateMode,
  closeUpdateMode,
}: IProps) => {
  const { closeDrawer } = useDrawerStore();

  return (
    <OutsideAlerter callback={closeDrawer}>
      <ul className="bg-base-100">
        <CartMobile
          updateMode={updateMode}
          closeUpdateMode={closeUpdateMode}
          order={order}
          onSubmit={onSubmit}
        />
      </ul>
    </OutsideAlerter>
  );
};

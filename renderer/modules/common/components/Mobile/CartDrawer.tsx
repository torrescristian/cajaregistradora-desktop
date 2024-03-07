import CartContainer from '@/modules/common/components/Mobile/CartContainer';
import { useDrawerStore } from '../../contexts/useDrawerStore';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import OutsideAlerter from '../OutsideAlerter';

interface IProps {
  onSubmit?: () => void;
  closeUpdateMode: () => void;
}

export const CartDrawer = ({
  onSubmit,

  closeUpdateMode,
}: IProps) => {
  const { closeDrawer } = useDrawerStore();

  return (
    <OutsideAlerter callback={closeDrawer}>
      <ul className="bg-base-100">
        <CartContainer closeUpdateMode={closeUpdateMode} onSubmit={onSubmit} />
      </ul>
    </OutsideAlerter>
  );
};

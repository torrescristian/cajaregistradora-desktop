import CartMobile from '@/modules/common/components/Mobile/CartMobile';
import { useModalStore } from '../../contexts/useModalStore';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  closeUpdateMode: () => void;
}

export const CartDrawer = ({ onSubmit, order, updateMode,closeUpdateMode }: IProps) => {
  const { isOpen } = useModalStore();
  return (
    <div className="drawer-side">
      <label
        htmlFor="carrito-drawer"
        aria-label="cerrar sidebar"
        className={isOpen ? 'drawer-overlay' : ''}
      ></label>
      <ul className="bg-base-100">
        <CartMobile updateMode={updateMode} closeUpdateMode={closeUpdateMode} order={order} onSubmit={onSubmit} />
      </ul>
    </div>
  );
};

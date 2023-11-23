import CartMobile from '@/modules/common/components/Mobile/CartMobile';
import { useModalStore } from '../../contexts/useModalStore';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

export const CartDrawer = () => {
  const { isOpen } = useModalStore();
  return (
    <div className="drawer-side">
      <label
        htmlFor="carrito-drawer"
        aria-label="cerrar sidebar"
        className={isOpen ? 'drawer-overlay' : ''}
      ></label>
      <ul className="bg-neutral">
        <CartMobile />
      </ul>
    </div>
  );
};

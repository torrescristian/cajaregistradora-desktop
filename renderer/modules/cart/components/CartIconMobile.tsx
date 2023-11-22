import { CartDrawer } from '@/modules/common/components/CartDrawer';
import { useModalStore } from '@/modules/common/contexts/useModalStore';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ICartItem } from '../interfaces/ICart';
import { getCartItems, useCartStore } from '../contexts/useCartStore';

export const CartIconMobile = () => {
  const { openModal } = useModalStore();
  const items = useCartStore(getCartItems) as ICartItem[];

  return (
    <div className="indicator">
      {items.length > 0 ? (
        <div>
          <span className="indicator-item badge badge-error">
            {items.length}
          </span>
          <label
            htmlFor="menu-drawer"
            className="drawer-button btn btn-primary"
            onClick={() => openModal(<CartDrawer />)}
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </label>
        </div>
      ) : (
        <div>
          <label
            htmlFor="menu-drawer"
            className="drawer-button btn btn-disabled btn-primary"
            onClick={() => openModal(<CartDrawer />)}
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </label>
        </div>
      )}
    </div>
  );
};

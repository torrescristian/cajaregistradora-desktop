import { CartDrawer } from '@/modules/common/components/Mobile/CartDrawer';
import { useDrawerStore } from '@/modules/common/contexts/useDrawerStore';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ICartItem, IPromoItem } from '../../../cart/interfaces/ICart';
import {
  getCartItems,
  useCartStore,
} from '../../../cart/contexts/useCartStore';

interface IProps {
  onSubmit?: () => void;
  closeUpdateMode: () => void;
  promoItems: IPromoItem[];
}

export const CartMenu = ({
  onSubmit,

  closeUpdateMode,
  promoItems,
}: IProps) => {
  const { openDrawer } = useDrawerStore();
  const items = useCartStore(getCartItems) as ICartItem[];

  return (
    <div className="indicator">
      <div>
        {items.length || promoItems.length ? (
          <span className="indicator-item badge badge-error">
            {items.length + promoItems.length}
          </span>
        ) : null}
        <label
          htmlFor="menu-drawer"
          className="drawer-button btn btn-primary z-50"
          onClick={() =>
            openDrawer(
              <CartDrawer
                closeUpdateMode={closeUpdateMode}
                onSubmit={onSubmit}
              />,
            )
          }
        >
          <ShoppingCartIcon className="w-5 h-5" />
        </label>
      </div>
    </div>
  );
};

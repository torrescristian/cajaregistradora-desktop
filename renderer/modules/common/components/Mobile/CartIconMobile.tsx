import { CartDrawer } from '@/modules/common/components/Mobile/CartDrawer';
import { useModalStore } from '@/modules/common/contexts/useModalStore';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ICartItem, IPromoItem } from '../../../cart/interfaces/ICart';
import {
  getCartItems,
  useCartStore,
} from '../../../cart/contexts/useCartStore';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { IPromo } from '@/modules/promos/interfaces/IPromo';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  closeUpdateMode: () => void;
  promoItems: IPromoItem[];
}

export const CartIconMobile = ({
  onSubmit,
  order,
  updateMode,
  closeUpdateMode,
  promoItems,
}: IProps) => {
  const { openModal } = useModalStore();
  const items = useCartStore(getCartItems) as ICartItem[];

  return (
    <div className="indicator">
      {items.length || promoItems.length > 0 ? (
        <div>
          <span className="indicator-item badge badge-error">
            {items.length + promoItems.length}
          </span>
          <label
            htmlFor="menu-drawer"
            className="drawer-button btn btn-primary"
            onClick={() =>
              openModal(
                <CartDrawer
                  updateMode={updateMode}
                  closeUpdateMode={closeUpdateMode}
                  order={order}
                  onSubmit={onSubmit}
                />,
              )
            }
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </label>
        </div>
      ) : (
        <div>
          <label
            htmlFor="menu-drawer"
            className="drawer-button btn btn-disabled btn-primary"
            onClick={() =>
              openModal(
                <CartDrawer
                  updateMode={updateMode}
                  closeUpdateMode={closeUpdateMode}
                  order={order}
                  onSubmit={onSubmit}
                />,
              )
            }
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </label>
        </div>
      )}
    </div>
  );
};

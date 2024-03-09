import { formatPrice } from '@/modules/common/libs/utils';
import {
  getCartItems,
  getPromoItems,
  getSubtotalPrice,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { Card } from '@/modules/common/components/Card';
import { RenderIf } from '@/modules/common/components/RenderIf';
import CartPromo from '../../../cart/components/CartPromo';
import { Divider } from '../../../cart/components/Sale/Sale.styles';
import { ICartItem } from '../../../cart/interfaces/ICart';
import CartItem from '../Mobile/CartItem';
import { useDrawerStore } from '@/modules/common/contexts/useDrawerStore';
import { AdditionalDetailsOrderDrawer } from '../../../cart/components/AdditionalDetailsOrderDrawer';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const CartReview = () => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const promosItems = useCartStore(getPromoItems);

  return (
    <section className="bg-base-100 flex min-w-[320px] flex-col items-center px-4">
      <Divider>Carrito</Divider>
      <PasarOrdenButton />
      <Divider />
      <div className="flex flex-col gap-4 overflow-y-scroll">
        {items.map((item) => (
          <CartItem
            key={item.selectedVariant.id}
            product={item.product}
            variant={item.selectedVariant}
          />
        ))}
        <CartPromo promosItems={promosItems} />
      </div>
    </section>
  );
};

function PasarOrdenButton() {
  const items = useCartStore(getCartItems) as ICartItem[];
  const promosItems = useCartStore(getPromoItems);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const { openDrawer } = useDrawerStore();

  return (
    <div className="flex flex-col items-center text-base-content gap-4 w-full">
      <p className="flex text-center text-xl gap-5">
        <span className="text-neutral-500">Total:</span>
        <span>{formatPrice(subtotalPrice)}</span>
      </p>
      <div className="flex flex-row items-center">
        <RenderIf condition={items.length || promosItems.length}>
          <button
            className="btn btn-primary flex gap-4"
            onClick={() =>
              openDrawer(
                <AdditionalDetailsOrderDrawer promoItems={promosItems} />,
              )
            }
          >
            <ShoppingCartIcon className="w-5 h-5" /> Pasar Orden
          </button>
        </RenderIf>
      </div>
    </div>
  );
}

export default CartReview;

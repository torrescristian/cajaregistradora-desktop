import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/modules/common/libs/utils';
import {
  getCartItems,
  getPromoItems,
  getSubtotalPrice,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { Card } from '@/modules/common/components/Card';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import CartPromo from './CartPromo';
import CartItem from './CartItem';
import { Divider } from './Sale/Sale.styles';
import { ICartItem } from '../interfaces/ICart';
import { ConfirmOrderMobile } from './ConfirmOrderMobile';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex flex-col sm:flex-row w-full gap-5 justify-between">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-full flex-col items-center gap-5">
    <Divider>Carrito</Divider>
    {children}
    <section>
      {totalAmount ? (
        <p className="text-2xl">
          <span className="text-base">Total:</span> {formatPrice(totalAmount)}
        </p>
      ) : (
        ''
      )}
    </section>
  </section>
);

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
}

const Cart = ({ updateMode, order, onSubmit }: IProps) => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const promosItems = useCartStore(getPromoItems);

  if (updateMode && !order) {
    throw new Error('Missing order to update');
  }

  return (
    <Layout>
      <ProductContainer>
        <div className="flex flex-row gap-3 overflow-x-scroll">
          {items.map((item) => (
            <CartItem
              key={item.selectedVariant.id}
              product={item.product}
              variant={item.selectedVariant}
            />
          ))}
          <CartPromo promosItems={promosItems} />
        </div>
        <Card>
          <section className="p-5">
            <p className="text-2xl">
              <span className="text-xl text-primary">Total:</span>{' '}
              {formatPrice(subtotalPrice)}
            </p>
          </section>
          <section className="w-max">
            <RenderIf condition={items.length || promosItems.length}>
              <ConfirmOrderMobile
                updateMode={updateMode}
                order={order}
                onSubmit={onSubmit}
                promoItems={promosItems}
              />
            </RenderIf>
            <RenderIf condition={!items.length && !promosItems.length}>
              <section className="bg-info text-primary-content p-4 w-full">
                No hay productos en el carrito
              </section>
            </RenderIf>
          </section>
        </Card>
      </ProductContainer>
    </Layout>
  );
};

export default Cart;

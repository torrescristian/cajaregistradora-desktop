import { IComponent } from '@/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/libs/utils';
import { ICartItem } from '@/interfaces/ICart';
import CartItem from './CartItem';
import {
  getCartItems,
  getTotalAmount,
  useCartStore,
} from '@/contexts/CartStore';
import { ConfirmOrder } from './ConfirmOrder';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex flex-row w-full gap-5 justify-between">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-full flex-col items-center gap-5">
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

const Cart = () => {
  const items = useCartStore(getCartItems) as ICartItem[];
  const totalAmount = useCartStore(getTotalAmount);

  return (
    <Layout>
      <ProductContainer>
        <div className="flex flex-row gap-3 overflow-x-scroll">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              variant={item.selectedVariant}
            />
          ))}
        </div>
        <section className="flex flex-col items-center justify-around gap-5 p-4 rounded-xl bg-[rgba(0,0,0,0.7)]">
          <section className="flex w-max items-center">
            <p className="text-2xl text-white">
              <span className="text-xl ">Total:</span>{' '}
              {formatPrice(totalAmount)}
            </p>
          </section>
          <section className="w-max">
            {items.length ? (
              <ConfirmOrder />
            ) : (
              <section className="alert alert-warning w-full">
                No hay productos en el carrito
              </section>
            )}
          </section>
        </section>
      </ProductContainer>
    </Layout>
  );
};

export default Cart;

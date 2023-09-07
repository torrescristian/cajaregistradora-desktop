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
  <section className="flex flex-col items-end overflow-y-scroll w-96 gap-2 h-[70vh]">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-[40vw] flex-col items-center gap-5">
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
        {items.map((item) => (
          <CartItem key={item.product.id} product={item.product}  variant={item.selectedVariant}/>
        ))}
      </ProductContainer>
      <section className="flex flex-row items-center pb-5 gap-5 bottom-2 p-4 z-20 rounded-xl  fixed right-12 bg-[rgba(0,0,0,0.7)]">
        <section className="flex w-max items-center">
          <p className="text-2xl text-white">
            <span className="text-xl ">Total:</span> {formatPrice(totalAmount)}
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
    </Layout>
  );
};

export default Cart;

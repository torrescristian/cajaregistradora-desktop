import { IComponent } from '@/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/libs/utils';
import {
  getAdditionalDetails,
  getCartItems,
  getClientName,
  getClientPhone,
  getTotalAmount,
  useCartSelect,
} from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import Loader from '@/components/Loader';
import CartItem from './CartItem';
import useOrderMutation from '@/hooks/services/useOrderMutation';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex w-80  flex-col ">{children}</section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-4/12 flex-col items-center gap-5">
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
  const items = useCartSelect(getCartItems) as ICartItem[];
  const totalAmount = useCartSelect(getTotalAmount);
  const orderMutation = useOrderMutation();
  const clientName = useCartSelect(getClientName);
  const clientPhone = useCartSelect(getClientPhone);
  const additionalDetails = useCartSelect(getAdditionalDetails);
  const totalPrice = useCartSelect(getTotalAmount);

  const handleSubmit = () => {
    orderMutation.mutate({
      items,
      clientName,
      clientPhone,
      totalPrice,
      additionalDetails,
    });
  };
  if (orderMutation.isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (orderMutation.isSuccess) {
    return (
      <Layout>
        <div className="p-10 toast toast-top toast-end">
          <div className="alert alert-success">
            <span className="text-stone-50 text-xl">Pedido agregado 🎉</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductContainer>
        {items.map((item) => (
          <CartItem key={item.product.id} product={item.product} />
        ))}
      </ProductContainer>
      <section className="flex flex-col items-end pb-5 gap-5 bottom-2 p-4 z-20 rounded-xl  fixed right-12 bg-[rgba(0,0,0,0.7)]">
        <section className="flex w-max items-center">
          <p className="text-2xl text-white">
            <span className="text-xl ">Total:</span> {formatPrice(totalAmount)}
          </p>
        </section>
        <section className="w-max">
          {items.length ? (
            <button
              onClick={handleSubmit}
              className="btn sticky top-0 z-20 w-fit whitespace-nowrap bg-green-400 text-xl text-stone-50 hover:bg-green-600"
            >
              Pasar orden
            </button>
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

import { IComponent } from '@/interfaces/ProductItem.interfaces';
import { formatPrice } from '@/libs/utils';
import useSalesMutation from '@/hooks/services/useSalesMutation';
import {
  getCartItems,
  getTotalAmount,
  useCartSelect,
} from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';
import Loader from '@/components/Loader';
import CartItem from './CartItem';

const ProductContainer = ({ children }: IComponent) => (
  <section className="flex w-full flex-1 flex-col gap-y-2.5">
    {children}
  </section>
);

const Layout = ({
  children,
  totalAmount,
}: IComponent & { totalAmount?: number }) => (
  <section className="flex w-1/2 flex-col items-center">
    <section>
      <section className="flex w-full flex-col items-start text-center">
        <h1 className="w-full text-2xl">🛒 Carrito</h1>
        <p className="py-5">
          Revisa y corrige los artículos que estás a punto de vender
        </p>
      </section>{' '}
      {totalAmount ? (
        <p className="text-2xl">
          <span className="text-base">Total:</span> {formatPrice(totalAmount)}
        </p>
      ) : (
        ''
      )}
    </section>
    {children}
  </section>
);

const Cart = () => {
  const items = useCartSelect(getCartItems) as ICartItem[];
  const totalAmount = useCartSelect(getTotalAmount);
  const salesMutation = useSalesMutation();

  const handleSubmit = () => {
    salesMutation.mutate({ items, totalAmount });
  };

  if (salesMutation.isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (salesMutation.isSuccess) {
    return (
      <Layout>
        <section className="alert flex justify-center bg-green-400 text-2xl text-stone-50">
          ¡Venta registrada! 🎉
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="flex pb-5">
        <section className="flex w-1/2 items-center">
          <p className="text-2xl">
            <span className="text-base">Total:</span> {formatPrice(totalAmount)}
          </p>
        </section>
        <section className="w-1/2">
          {items.length ? (
            <button
              onClick={handleSubmit}
              className="btn sticky top-0 z-20 w-fit whitespace-nowrap bg-green-400 text-xl text-stone-50 hover:bg-green-600"
            >
              🖨️ Imprimir Ticket
            </button>
          ) : (
            <section className="alert alert-warning w-full">
              No hay productos en el carrito
            </section>
          )}
        </section>
      </section>

      <ProductContainer>
        {items.map((item) => (
          <CartItem key={item.product.id} product={item.product} />
        ))}
      </ProductContainer>
    </Layout>
  );
};

export default Cart;

import Products from '@/components/Products';
import Cart from '@/components/Cart';
import Order from '@/components/Order';
import { getCartItems, useCartSelect } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';

const Productos = () => {
  const items = useCartSelect(getCartItems) as ICartItem[];
  return (
    <section className="flex w-full flex-row items-start h-max justify-between gap-2 px-5">
      <Products />
      <Cart />
    </section>
  );
};

export default Productos;

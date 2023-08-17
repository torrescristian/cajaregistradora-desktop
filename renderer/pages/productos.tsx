import Products from '@/components/Products';
import Cart from '@/components/Cart';
import Order from '@/components/Order';
import { getCartItems, useCartSelect } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';

const Productos = () => {
  const items = useCartSelect(getCartItems) as ICartItem[];
  return (
    <section className="flex w-full flex-row items-start relative justify-between gap-2 ">
      <Cart />
      <Products />
    </section>
  );
};

export default Productos;

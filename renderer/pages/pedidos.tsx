import Products from '@/components/Products';
import Cart from '@/components/Cart';
import { getCartItems, useCartSelect } from '@/contexts/CartContext';
import { ICartItem } from '@/interfaces/ICart';

const Pedidos = () => {
  const items = useCartSelect(getCartItems) as ICartItem[];
  return (
    <section className="flex w-full flex-row items-start relative justify-between gap-2 ">
      <Products />
      <Cart />
    </section>
    
  );
};

export default Pedidos;

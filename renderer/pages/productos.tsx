import Products from '@/components/Products';
import Cart from '@/components/Cart';

const Productos = () => {
  return (
    <section className="flex w-full flex-row items-start justify-between gap-10 px-5">
      <Products />
      <Cart />
    </section>
  );
};

export default Productos;

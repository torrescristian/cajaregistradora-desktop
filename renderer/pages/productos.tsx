import { getServerSideAuthProps } from '@/libs/auth';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async (ctx: any) =>
  getServerSideAuthProps(ctx);

export default Productos;

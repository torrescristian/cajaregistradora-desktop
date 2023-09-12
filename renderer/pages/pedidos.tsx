import Products from '@/components/Products';
import Cart from '@/components/Cart';
import { RenderIf } from '@/components/RenderIf';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import Loader from '@/components/Loader';

const Pedidos = () => {
  const { isLoading, isError, isSuccess, cashIsActive } =
    useActiveCashBalanceQuery();

  return (
    <section className="flex w-full flex-col items-start relative justify-between gap-2 ">
      <RenderIf condition={isLoading}>
        <Loader />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <RenderIf condition={cashIsActive}>
          <Products />
          <Cart />
        </RenderIf>
        <RenderIf condition={!cashIsActive}>
          <p className="text-xl w-full text-center">No hay caja activa</p>
        </RenderIf>
      </RenderIf>
    </section>
  );
};

export default Pedidos;

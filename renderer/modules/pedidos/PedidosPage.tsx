import Loader from '@/modules/common/components/Loader';
import Products from '@/modules/products/components/Products';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import Cart from '../cart/components/Cart';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { ProductsMobile } from '../products/components/ProductsMobile';

export default function PedidosPage() {
  const { isLoading, cashIsActive } = useActiveCashBalanceQuery();
  const isMobile = useIsMobile();
  if (isLoading) {
    return <Loader />;
  }
  return isMobile ? (
    <div className="flex flex-col w-full">
      <ProductsMobile />
    </div>
  ) : (
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
}

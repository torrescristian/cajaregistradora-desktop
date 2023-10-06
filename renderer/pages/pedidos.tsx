import Products from '@/components/Products';
import Cart from '@/components/Cart/Cart';
import { RenderIf } from '@/components/RenderIf';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import Loader from '@/components/Loader';
import RenderPromos from '@/components/Promo/RenderPromo';
import usePromoQuery from '@/hooks/services/usePromoQuery';
import { useState } from 'react';
import { IPromo } from '@/interfaces/IPromo';

const Pedidos = () => {
  const { isLoading, isError, isSuccess, cashIsActive } =
    useActiveCashBalanceQuery();

  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;
  const [salesMode, setSalesMode] = useState<IPromo[] | null>(null);

  if (promoQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex w-full flex-col items-start relative justify-between gap-2 ">
      <RenderIf condition={isLoading}>
        <Loader />
      </RenderIf>
      <RenderIf condition={!isLoading}>
        <RenderIf condition={cashIsActive}>
          <RenderPromos
            promosItems={promos!.map((promo) => ({
              promo,
              selectedVariants: [],
            }))}
            salesMode
          />
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

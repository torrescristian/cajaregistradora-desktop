import { CreatePromo } from '@/components/Promo/CreatePromo';
import RenderPromos from '@/components/Promo/RenderPromo';
import usePromoQuery from '@/hooks/services/usePromoQuery';

const Promo = () => {
  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;

  if (!promos) {
    return null;
  }
  return (
    <section className="flex flex-col w-full gap-5">
      <CreatePromo />
      <p className="text-xl text-center">Promos creadas</p>
      <RenderPromos promos={promos} />
    </section>
  );
};

export default Promo;

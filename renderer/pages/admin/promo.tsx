import CreateListTabs from '@/components/CreateListTabs';
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
    <CreateListTabs name="promo">
      {(createMode: boolean) =>
        createMode ? (
          <CreatePromo />
        ) : (
          <RenderPromos
            promosItems={promos.map((promo) => ({
              promo,
              selectedVariants: [],
            }))}
          />
        )
      }
    </CreateListTabs>
  );
};

export default Promo;

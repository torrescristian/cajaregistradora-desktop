import CreateListTabs from '@/components/CreateListTabs';
import { CreatePromo } from '@/components/Promo/CreatePromo';
import RenderPromos from '@/components/Promo/RenderPromo';
import { useSearchProps } from '@/components/SearchInput';
import usePromoQuery from '@/hooks/services/usePromoQuery';

const Promo = () => {
  const searchProps = useSearchProps();
  const promoQuery = usePromoQuery({
    query:searchProps.query,
  });
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

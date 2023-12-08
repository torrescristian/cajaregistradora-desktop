import CreateListTabs from '@/modules/common/components/CreateListTabs';
import RenderPromos from './components/RenderPromo';
import { CreatePromo } from './components/CreatePromo';
import usePromoQuery from '@/modules/promos/hooks/usePromoQuery';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CreatePromoMobile } from './components/CreatePromoMobile';

export default function PromoPage() {
  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;
  const isMobile = useIsMobile();

  if (!promos) {
    return null;
  }
  return (
    <CreateListTabs name="promo">
      {(createMode: boolean) =>
        createMode ? (
          isMobile ? (
            <CreatePromoMobile />
          ) : (
            <CreatePromo />
          )
        ) : (
          <RenderPromos
            promosItems={promos.map((promo) => ({
              promo,
              selectedVariants: [],
            }))}
            editButton
          />
        )
      }
    </CreateListTabs>
  );
}

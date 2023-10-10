import CreateListTabs from '@/components/CreateListTabs';
import { CreatePromo } from '@/components/Promo/CreatePromo';
import RenderPromos from '@/components/Promo/RenderPromo';
import { RenderIf } from '@/components/RenderIf';
import TabButton from '@/components/TabButton';
import usePromoQuery from '@/hooks/services/usePromoQuery';
import { useState } from 'react';

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

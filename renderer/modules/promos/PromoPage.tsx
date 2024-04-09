import CreateListTabs from '@/modules/common/components/molecules/CreateListTabs';
import RenderPromos from './components/RenderPromo';
import { CreatePromo } from './components/CreatePromo';
import usePromoQuery from '@/modules/promos/hooks/usePromoQuery';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CreatePromoMobile } from './components/CreatePromoMobile';
import CategoriesPage from '../categorias/CategoriesPage';

export default function PromoPage() {
  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;
  const isMobile = useIsMobile();

  if (!promos) {
    return null;
  }
  return (
    <CreateListTabs
      tabs={[
        {
          label: 'Crear promo',
          component: isMobile ? <CreatePromoMobile /> : <CreatePromo />,
        },
        {
          label: 'Promos',
          component: (
            <RenderPromos
              promosItems={promos.map((promo) => ({
                promo,
                selectedVariants: [],
              }))}
              editButton
            />
          ),
        },
        { label: 'Crear categoria', component: <CategoriesPage /> },
      ]}
    ></CreateListTabs>
  );
}

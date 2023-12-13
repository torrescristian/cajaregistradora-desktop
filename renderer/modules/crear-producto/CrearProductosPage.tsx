import CreateListTabs from '../common/components/CreateListTabs';
import ProductControlMobile from '../common/components/Mobile/ProductControlMobile';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CreateProductTypeMenuModal } from './components/CreateProductTypeMenuModal';
import ProductControl from './components/ProductControl';

export default function CrearProductosPage() {
  const isMobile = useIsMobile();
  return (
    <section className="flex w-full sm:mt-2 mt-40 sm:flex-row sm:justify-evenly">
      <CreateListTabs
        tabs={[
          {
            label: 'Crear producto',
            component: isMobile ? (
              <ProductControlMobile controlType={'CREATE'} />
            ) : (
              <ProductControl controlType={'CREATE'} />
            ),
          },
          { label: 'Crear menu', component: <CreateProductTypeMenuModal /> },
        ]}
      ></CreateListTabs>
    </section>
  );
}

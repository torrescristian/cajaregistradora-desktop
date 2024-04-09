import CreateListTabs from '../common/components/molecules/CreateListTabs';
import { CreateProductTypeMenuModal } from './components/CreateProductTypeMenuModal';
import ProductControl from './components/ProductControl';

export default function CrearProductosPage() {
  return (
    <section className="flex w-full sm:mt-2 mt-40 sm:flex-row sm:justify-evenly">
      <CreateListTabs
        tabs={[
          {
            label: 'Crear producto',
            component: <ProductControl controlType={'CREATE'} />,
          },
          { label: 'Crear menu', component: <CreateProductTypeMenuModal /> },
        ]}
      ></CreateListTabs>
    </section>
  );
}

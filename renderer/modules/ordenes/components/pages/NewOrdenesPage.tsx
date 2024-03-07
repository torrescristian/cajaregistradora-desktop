import TablesColumn from '../organisms/TablesColumn';
import DeliveriesColumn from '../organisms/DeliveriesColumn';
import OrdersColumn from '../organisms/OrdersColumn';
import {
  getIsProductCatalogActive,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { ProductsMobile } from '@/modules/products/components/ProductsMobile';

export default function NewOrdenesPage() {
  const isProductCatalogActive = useOrderStore(getIsProductCatalogActive);

  if (isProductCatalogActive) {
    return <ProductsMobile />;
  }

  return (
    <section className="flex flex-row w-full text-center divide-x">
      <TablesColumn />
      <DeliveriesColumn />
      <OrdersColumn />
    </section>
  );
}

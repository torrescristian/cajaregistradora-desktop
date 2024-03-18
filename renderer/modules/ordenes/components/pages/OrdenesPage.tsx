import {
  getIsProductCatalogActive,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { ProductsCatalog } from '@/modules/products/components/ProductsCatalog';

import TablesColumn from '../organisms/TablesColumn';
import DeliveriesColumn from '../organisms/DeliveriesColumn';
import OrdersColumn from '../organisms/OrdersColumn';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import Loader from '@/modules/common/components/atoms/Loader';
import { useRouter } from 'next/router';
import { CAJA_URL } from '@/modules/common/consts';

export default function OrdenesPage() {
  const router = useRouter();
  const isProductCatalogActive = useOrderStore(getIsProductCatalogActive);

  const { isLoading, cashIsActive } = useActiveCashBalanceQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (!cashIsActive) {
    return (
      <div className="self-center flex flex-col items-center gap-3">
        <div className="alert alert-warning w-fit self-center mt-10 select-none">
          Para comenzar a realizar ventas, es necesario inicializar una caja.
        </div>
        <button
          className="btn btn-primary"
          onClick={() => router.push(CAJA_URL)}
        >
          Ir a Caja
        </button>
      </div>
    );
  }

  if (isProductCatalogActive) {
    return <ProductsCatalog />;
  }

  return (
    <section className="flex flex-row w-full text-center divide-x">
      <TablesColumn />
      <DeliveriesColumn />
      <OrdersColumn />
    </section>
  );
}

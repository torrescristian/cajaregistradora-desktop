import Loader from '@/modules/common/components/Loader';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { ProductsMobile } from '../products/components/ProductsMobile';

export default function PedidosPage() {
  const { isLoading } = useActiveCashBalanceQuery();

  if (isLoading) {
    return <Loader />;
  }

  return <ProductsMobile />;
}

import Loader from '@/modules/common/components/Loader';
import Products from '@/modules/products/components/Products';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import Cart from '../cart/components/Cart';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { ProductsMobile } from '../products/components/ProductsMobile';

export default function PedidosPage() {
  const { isLoading, cashIsActive } = useActiveCashBalanceQuery();
  const isMobile = useIsMobile();
  if (isLoading) {
    return <Loader />;
  }

  return <ProductsMobile />;
}

import Loader from '@/modules/common/components/Loader';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { ProductsMobile } from '../products/components/ProductsMobile';
import { useRouter } from 'next/router';

export default function PedidosPage() {
  const { isLoading, cashIsActive } = useActiveCashBalanceQuery();

  const router = useRouter()

  if (isLoading) {
    return <Loader />;
  }

  if (!cashIsActive) {
    return <div className="self-center flex flex-col items-center gap-3">
      <div className="alert alert-warning w-fit self-center mt-10 select-none">
      Para comenzar a realizar ventas, es necesario inicializar una caja.
    </div>
    <button className="btn btn-primary" onClick={() => router.push("/admin/caja")}>Ir a Caja</button>
    </div>
  }

  return <ProductsMobile />;
}

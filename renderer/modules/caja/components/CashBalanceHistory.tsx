import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import { ICashBalance } from '../interfaces/ICashBalance';
import TodayCashBalancesTable from './TodayCashBalancesTable';
import useCashBalancesQuery from '../hooks/useCashBalancesQuery';
import {
  Pagination,
  usePagination,
} from '@/modules/common/components/molecules/Pagination';

export default function CashBalanceHistory() {
  const paginationControls = usePagination();
  const todayCashBalances = useCashBalancesQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  const dailyCashBalances =
    todayCashBalances.data?.cashBalances?.map(
      (cashBalance) =>
        ({
          id: cashBalance.id,
          seller: cashBalance.seller,
          initialCashAmount: cashBalance.initialCashAmount,
          completedAt: cashBalance.completedAt,
          totalAmount: cashBalance.totalAmount,
          newCashAmount: cashBalance.newCashAmount,
          refunds: cashBalance.refunds,
        }) as ICashBalance,
    ) || [];

  console.log({ dailyCashBalances });

  return (
    <div>
      <RenderIf condition={!dailyCashBalances.length}>
        <p className="text-center text-xl font-bold">No hay cajas</p>
      </RenderIf>
      <RenderIf condition={dailyCashBalances.length}>
        <section className="flex flex-col gap-5 w-full">
          <p className="text-2xl text-center">Historial de Cajas:</p>
          <TodayCashBalancesTable cashBalances={dailyCashBalances} />
          <Pagination {...paginationControls} />
        </section>
      </RenderIf>
    </div>
  );
}

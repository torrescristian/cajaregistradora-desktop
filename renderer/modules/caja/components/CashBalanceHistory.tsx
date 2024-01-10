import { RenderIf } from '@/modules/common/components/RenderIf';
import { ICashBalance, ICashBalanceExpanded } from '../interfaces/ICashBalance';
import TodayCashBalancesTable from './TodayCashBalancesTable';
import useCashBalancesQuery from '../hooks/useCashBalancesQuery';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';
import { twMerge } from 'tailwind-merge';

export default function CashBalanceHistory() {
  const paginationControls = useButtonPagination();
  const todayCashBalances = useCashBalancesQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  const cashBalanceDay = todayCashBalances.data?.cashBalances.map(
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
  );

  return (
    <div>
      <RenderIf condition={!todayCashBalances.data?.cashBalances.length}>
        <p className="text-center text-xl font-bold">No hay cajas</p>
      </RenderIf>
      <RenderIf condition={todayCashBalances.data?.cashBalances.length}>
        <section className="flex flex-col gap-5 w-full">
          <p className="text-2xl text-center">Cajas del dia</p>
          <TodayCashBalancesTable cashBalance={cashBalanceDay!} />
          <ButtonPagination {...paginationControls} />
        </section>
      </RenderIf>
    </div>
  );
}

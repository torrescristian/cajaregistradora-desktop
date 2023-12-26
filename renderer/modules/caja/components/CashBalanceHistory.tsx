import { RenderIf } from '@/modules/common/components/RenderIf';
import { formatPrice } from '@/modules/common/libs/utils';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import useActiveCashBalanceQuery from '../hooks/useActiveCashBalanceQuery';
import usePrintService from '@/modules/common/hooks/usePrintService';
import { ICashBalance, ICashBalanceExpanded } from '../interfaces/ICashBalance';

export default function CashBalanceHistory() {
  const { todayCashBalances, isLoading: activeCashLoading } =
    useActiveCashBalanceQuery();

  const { printCash } = usePrintService();

  const handleClickReprint =
    (cashBalance: ICashBalance | ICashBalanceExpanded) =>
    (e: React.MouseEvent) => {
      e.preventDefault();

      printCash(cashBalance.id!);
    };

  return (
    <RenderIf condition={todayCashBalances.length}>
      <section className="w-full flex flex-col gap-5">
        <p className="text-2xl text-center">Cajas del dia</p>
        <div className="flex flex-row w-full gap-5 flex-wrap">
          {todayCashBalances.map((todayCashBalance) => (
            <div
              key={todayCashBalance.id!}
              className="flex flex-col w-max p-5 border-2"
            >
              <p>👤Vendedor: {todayCashBalance.seller.username}</p>
              <p className="whitespace-nowrap">
                💰Caja inicial:{' '}
                {formatPrice(todayCashBalance.initialCashAmount)}
              </p>
              <p className="whitespace-nowrap">
                💸Efectivo total: {formatPrice(todayCashBalance.totalAmount)}
              </p>
              <p className="whitespace-nowrap">
                ⏰La Caja cerro a las -{' '}
                {format(new Date(todayCashBalance.completedAt), 'HH:mm')}
                Hs
              </p>
              <button
                onClick={handleClickReprint(todayCashBalance)}
                className="btn btn-secondary gap-3"
              >
                <PrinterIcon className="w-5 h-5" /> Reimprimir
              </button>
            </div>
          ))}
        </div>
      </section>
    </RenderIf>
  );
}

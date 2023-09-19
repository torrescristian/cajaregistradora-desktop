import { ICashBalanceExpanded } from '@/interfaces/ICashBalance';
import { formatPrice } from '@/libs/utils';
import { DataItem } from './DataItem';

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivate = ({ cashBalance }: IProps) => {
  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col gap-3 w-full shadow-2xl p-10 border-stone-500 border-2">
        <h2 className="font-bold text-2xl text-center">Caja activa</h2>
        <DataItem
          label="Caja #"
          value={cashBalance?.id!}
          defaultValue="Caja sin identificar"
        />
        <DataItem
          label="Efectivo al iniciar:"
          value={formatPrice(cashBalance?.initialCashAmount!)}
          defaultValue="Monto inicial: $0.00"
        />
        <DataItem
          label="Efectivo actual:"
          value={formatPrice(
            cashBalance?.newCashAmount! + cashBalance?.initialCashAmount!,
          )}
          defaultValue="Total de caja efectivo: $0.00"
        />
        <DataItem
          label="Ingresos netos:"
          value={formatPrice(cashBalance?.totalAmount!)}
          defaultValue="$0.00"
        />
      </div>
    </section>
  );
};

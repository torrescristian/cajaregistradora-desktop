import { ICashBalanceExpanded } from '@/interfaces/ICashBalance';
import { formatPrice } from '@/libs/utils';
import { DataItem } from './DataItem';

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivate = ({ cashBalance }: IProps) => {
  return (
    <section className="flex flex-col ">
      <div className="flex flex-col sm:items-end gap-3 w-min shadow-2xl p-10 border-2">
        <h2 className="font-bold text-2xl text-stone-500">
          Caja activa #{cashBalance?.id}
        </h2>
        <DataItem
          label="Vendedor: "
          value={cashBalance?.seller.username}
          defaultValue="Caja sin identificar"
          className="text-2xl"
        />
        <DataItem
          label="Efectivo que había en la caja cuando comencé mi turno:"
          value={formatPrice(cashBalance?.initialCashAmount!)}
          defaultValue="Monto inicial: $0.00"
          className="text-2xl"
        />
        <DataItem
          label="Efectivo que debería haber actualmente en la caja:"
          value={formatPrice(
            cashBalance?.newCashAmount! + cashBalance?.initialCashAmount!,
          )}
          defaultValue="$0.00"
          className="text-2xl"
        />
        <DataItem
          label="Total de ventas en todas las formas de pago:"
          value={formatPrice(cashBalance?.totalAmount!)}
          defaultValue="$0.00"
          className="text-2xl"
        />
      </div>
    </section>
  );
};

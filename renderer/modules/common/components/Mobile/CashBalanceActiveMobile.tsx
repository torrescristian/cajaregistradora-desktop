import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivateMobile = ({ cashBalance }: IProps) => {
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex flex-col gap-3 items-start w-full shadow-2xl p-5 border-2">
        <h2 className="font-bold text-2xl text-base-content">
          Caja activa #{cashBalance?.id}
        </h2>
        <DataItem
          label="Vendedor: "
          value={cashBalance?.seller.username}
          defaultValue="Caja sin identificar"
          className="text-2xl"
        />
        <DataItem
          label="Caja Inicial:"
          value={formatPrice(cashBalance?.initialCashAmount!)}
          defaultValue="Monto inicial: $0.00"
          className="text-2xl"
        />
        <DataItem
          label="Caja Efectivo:"
          value={formatPrice(cashBalance?.newCashAmount || 0)}
          defaultValue="$0.00"
          className="text-2xl"
        />
        <DataItem
          label="Caja Virtual:"
          value={formatPrice(cashBalance?.digitalCashAmount || 0)}
          defaultValue="$0.00"
          className="text-2xl"
        />
        <DataItem
          label="Ganancia Diaria:"
          value={formatPrice(cashBalance?.totalAmount!)}
          defaultValue="$0.00"
          className="text-2xl"
        />
      </div>
    </section>
  );
};

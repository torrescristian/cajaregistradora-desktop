import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivate = ({ cashBalance }: IProps) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col sm:items-end gap-3 w-min shadow-2xl p-3 md:p-10 border-2">
        <h2 className="font-bold text-2xl self-start text-base-content">
          Caja activa #{cashBalance?.id}
        </h2>
        <DataItem
          label="Vendedor: "
          value={cashBalance?.seller.username}
          defaultValue="Caja sin identificar"
          className="text-2xl  justify-between w-full"
        />
        <DataItem
          label="Caja inicial:"
          value={formatPrice(cashBalance?.initialCashAmount!)}
          defaultValue="Monto inicial: $0.00"
          className="text-2xl  justify-between w-full"
        />
        <DataItem
          label="Efectivo total:"
          value={formatPrice(
            cashBalance?.newCashAmount! + cashBalance?.initialCashAmount!,
          )}
          defaultValue="$0.00"
          className="text-2xl  justify-between w-full"
        />
        <DataItem
          label="Caja total:"
          value={formatPrice(cashBalance?.totalAmount!)}
          defaultValue="$0.00"
          className="text-2xl justify-between w-full"
        />
      </div>
    </section>
  );
};

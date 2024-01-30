import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
}

export const CashBalanceActivate = ({ cashBalance }: IProps) => {
  return (
    <section className="flex flex-col stat">
      <h2 className="font-bold text-2xl self-center text-base-content">
        Caja activa #{cashBalance?.id}
      </h2>
      <div className="flex flex-col sm:items-end gap-10 w-max shadow-2xl p-3 md:p-10 border-2">
        <div className="w-full flex flex-row gap-10 justify-between">
          <DataItem
            label="Vendedor: "
            value={cashBalance?.seller.username}
            defaultValue="Caja sin identificar"
            className="text-sm w-full text-center "
            classNameValue="text-2xl"
          />
          <DataItem
            label="Caja inicial:"
            value={formatPrice(cashBalance?.initialCashAmount!)}
            defaultValue="Monto inicial: $0.00"
            className="text-sm text-center w-full"
            classNameValue="text-2xl"
          />
        </div>
        <div className="w-full flex flex-row gap-10 justify-between">
          <DataItem
            label="Efectivo total:"
            value={formatPrice(
              cashBalance?.newCashAmount! + cashBalance?.initialCashAmount!,
            )}
            defaultValue="$0.00"
            className=" w-full text-sm  text-center"
            classNameValue="stat-value"
          />
          <DataItem
            label="Caja total:"
            value={formatPrice(cashBalance?.totalAmount!)}
            defaultValue="$0.00"
            className="text-sm text-center w-full"
            classNameValue="stat-value"
          />
        </div>
      </div>
    </section>
  );
};

import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { ICashBalance, ICashBalanceExpanded } from '@/interfaces/ICashBalance';
import { formatPrice, parseDateToArgentinianFormat } from '@/libs/utils';

const Small = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-normal">{children}</span>
);

const Bold = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lg font-bold">{children}</span>
);

interface IProps {
  cashBalance: ICashBalanceExpanded | null;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CashBalance = ({ cashBalance, value, onChange }: IProps) => {
  return (
    <section className="w-max rounded-lg p-5 text-center shadow-xl">
      <label className="label">Monto inicial de la caja:</label>
      <input
        className="input w-full input-bordered"
        type="number"
        value={value}
        onChange={onChange}
      />
    </section>
  );
};

interface ICreateCashBalanceProps {
  onClick: () => void;
}
export const CreateCashBalance = ({ onClick }: ICreateCashBalanceProps) => (
  <button
    className="btn flex w-fit bg-green-500 text-stone-50 hover:bg-green-600"
    onClick={onClick}
  >
    Iniciar Caja
  </button>
);

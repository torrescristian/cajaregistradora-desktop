const Small = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-normal">{children}</span>
);

const Bold = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lg font-bold">{children}</span>
);

interface IProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CashBalance = ({ value, onChange }: IProps) => {
  return (
    <section className="w-max rounded-lg p-5 text-center shadow-xl">
      <label className="label">Monto inicial de la caja:</label>
      <input
        className="input w-full input-bordered"
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
    className="btn flex w-fit btn-primary text-primary-content"
    onClick={onClick}
  >
    Iniciar Caja
  </button>
);

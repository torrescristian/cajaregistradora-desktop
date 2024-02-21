interface IProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InitialCashBalanceInput = ({ value, onChange }: IProps) => {
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

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: any;
  values: { label: string; value: any }[];
}

export const Selector = ({ defaultValue, onChange, values }: IProps) => {
  return (
    <section>
      <select
        className="select select-bordered text-base-content w-min sm:w-36"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {values.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </section>
  );
};

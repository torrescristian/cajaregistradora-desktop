import { twMerge } from 'tailwind-merge';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: any;
  values: { label: string; value: any }[];
  className?: string;
}

export const Selector = ({
  defaultValue,
  onChange,
  values,
  className,
}: IProps) => {
  return (
    <select
      className={twMerge(
        'select select-bordered text-text-base-content w-full',
        className,
      )}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {values.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

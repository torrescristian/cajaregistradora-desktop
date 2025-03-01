import { twMerge } from 'tailwind-merge';

export const DataItem = ({
  label,
  value,
  defaultValue,
  className,
}: {
  label: string;
  value?: any;
  defaultValue?: any;
  className?: string;
}) => {
  return (
    <p className={twMerge('flex flex-col sm:flex-row gap-2', className)}>
      <dt className="text-base-content opacity-60 sm:whitespace-nowrap">
        {label}
      </dt>
      {value ? (
        <dd>{value}</dd>
      ) : (
        <dd className="text-base-content">{defaultValue}</dd>
      )}
    </p>
  );
};

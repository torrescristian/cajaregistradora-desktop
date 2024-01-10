import { twMerge } from 'tailwind-merge';

export const DataItem = ({
  label,
  value,
  defaultValue,
  className,
  classNameValue,
}: {
  label: string;
  value?: any;
  defaultValue?: any;
  className?: string;
  classNameValue?: string;
}) => {
  return (
    <p className={twMerge('flex flex-col gap-2', className)}>
      <dt className="text-base-content opacity-60 sm:whitespace-nowrap">
        {label}
      </dt>
      {value ? (
        <dd className={twMerge('text-base-content', classNameValue)}>
          {value}
        </dd>
      ) : (
        <dd className={twMerge('text-base-content', classNameValue)}>
          {defaultValue}
        </dd>
      )}
    </p>
  );
};

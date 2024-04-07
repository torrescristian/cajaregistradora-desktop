import { Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from '../atoms/ErrorMessage';
import Label from '../atoms/Label';
import Skeleton from '../atoms/Skeleton';

type IProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: any;
  label?: string;
  full?: boolean;
  labelClassName?: string;
  isLoading?: boolean;
};

const FormSelector = forwardRef(function Selector(
  {
    className,
    children,
    error,
    label,
    full,
    labelClassName,
    isLoading,
    ...props
  }: IProps,
  ref: Ref<HTMLSelectElement>,
) {
  return (
    <Label className={labelClassName}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <span>{label}</span>
          <select
            className={twMerge(
              'select select-bordered h-9 min-h-9 w-40 rounded border-goc-primary-disabled text-sm',
              error && 'border-goc-error',
              full && 'w-full',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <ErrorMessage>{error}</ErrorMessage>
        </>
      )}
    </Label>
  );
});

export default FormSelector;

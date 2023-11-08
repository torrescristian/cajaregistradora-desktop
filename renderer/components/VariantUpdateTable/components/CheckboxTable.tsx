import { useEffect, useRef } from 'react';

interface IProps {
  indeterminate: boolean;
}

export const CheckboxTable = ({ indeterminate, ...rest }: IProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current!.indeterminate = !ref.current?.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-primary"
      ref={ref}
      {...rest}
    />
  );
};

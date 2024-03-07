import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const ButtonAdd = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge('btn btn-outline text-base-content w-32', className)}
      {...props}
    >
      +
    </button>
  );
};

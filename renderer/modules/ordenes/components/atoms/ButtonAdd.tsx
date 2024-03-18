import { PlusIcon } from '@heroicons/react/24/solid';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const ButtonAdd = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge(
        'btn btn-outline text-base-content w-full btn-success',
        className,
      )}
      {...props}
    >
      <PlusIcon className="w-5 h-5" /> Nuevo
    </button>
  );
};

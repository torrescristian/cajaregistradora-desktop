import { PlusIcon } from '@heroicons/react/24/solid';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fill?: boolean;
};

export const ButtonAdd = ({ className, fill, ...props }: IProps) => {
  return (
    <button
      className={twMerge(
        'btn text-base-content w-full btn-success',
        fill ? 'btn-fill' : 'btn-outline',
        className,
      )}
      {...props}
    >
      <PlusIcon className="w-5 h-5" /> Nuevo
    </button>
  );
};

import { ButtonHTMLAttributes } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fill?: boolean;
};

export default function CheckButton({ className, fill, ...props }: IProps) {
  return (
    <button
      className={twMerge(
        'btn btn-success btn-square text-base-content',
        fill ? '' : 'btn-outline',
        className,
      )}
      {...props}
    >
      <CheckIcon className="w-5 h-5 " />
    </button>
  );
}

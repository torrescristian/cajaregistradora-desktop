import { ButtonHTMLAttributes } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

export default function EditButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        'btn btn-square btn-outline text-base-content',
        className,
      )}
      {...props}
    >
      <PencilIcon className="w-5 h-5 " />
    </button>
  );
}

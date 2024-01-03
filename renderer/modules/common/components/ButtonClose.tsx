import { XMarkIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

interface IProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const ButtonClose = ({ label, onClick, className }: IProps) => {
  return (
    <button
      className={twMerge('btn btn-ghost items-center gap-2', className)}
      onClick={onClick}
    >
      <XMarkIcon className="text-error" width={20} />
      {label}
    </button>
  );
};

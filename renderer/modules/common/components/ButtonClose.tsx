import { XMarkIcon } from '@heroicons/react/24/solid';

interface IProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const ButtonClose = ({ label, onClick, className }: IProps) => {
  return (
    <button
      className={className ? className : 'btn btn-ghost items-center gap-2'}
      onClick={onClick}
    >
      <XMarkIcon className="text-error" width={20} />
      {label}
    </button>
  );
};

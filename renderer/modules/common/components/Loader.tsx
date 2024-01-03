import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

interface IProps {
  className?: string;
}
export default function Loader({ className }: IProps) {
  return (
    <ArrowPathIcon className={twMerge('h-8 w-full animate-spin', className)} />
  );
}

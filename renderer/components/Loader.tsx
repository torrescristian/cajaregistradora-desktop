import { mergeClasses } from '@/libs/utils';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface IProps {
  className?: string;
}
export default function Loader({ className }: IProps) {
  return (
    <ArrowPathIcon
      className={mergeClasses('h-8 w-full animate-spin', className)}
    />
  );
}

import { twMerge } from 'tailwind-merge';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
interface IProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  columnMode?: boolean;
}
export default function FieldLabel({
  children,
  title,
  className,
  columnMode,
}: IProps) {
  return (
    <label
      className={twMerge(
        columnMode ? 'flex-col' : 'flex-row',
        'flex',
        className,
      )}
    >
      <span className="text-neutral-content">{title}</span>
      {children}
    </label>
  );
}

import { twMerge } from 'tailwind-merge';
interface IProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  columnMode?: boolean;
  classNameTitle?: string;
}
export default function FieldLabel({
  children,
  title,
  className,
  columnMode,
  classNameTitle,
}: IProps) {
  return (
    <label
      className={twMerge(
        columnMode ? 'flex-col' : 'flex-row',
        'flex',
        className,
      )}
    >
      <span className={twMerge(classNameTitle)}>{title}</span>
      {children}
    </label>
  );
}

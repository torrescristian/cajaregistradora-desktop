import { twMerge } from 'tailwind-merge';

interface IProps {
  children: any;
  tabIndex?: number;
  className?: string;
}

export const Card = ({ children, tabIndex, className }: IProps) => {
  return (
    <section
      className={twMerge(
        'flex flex-col relative p-4 items-center justify-between border-2 border-secondary',
        className,
      )}
    >
      {children}
    </section>
  );
};

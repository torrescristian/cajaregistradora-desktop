import { twMerge } from 'tailwind-merge';

export const Divider = ({
  children,
  className,
}: {
  children?: any;
  className?: string;
}) => (
  <div className={twMerge('divider h-1 w-full', className)}>{children}</div>
);

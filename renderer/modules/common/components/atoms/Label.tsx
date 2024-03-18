import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, className }: IProps) {
  return (
    <label className={twMerge('flex flex-col', className)}>{children}</label>
  );
}

import { twMerge } from 'tailwind-merge';
import { IComponent } from '@/interfaces/ProductItem.interfaces';

export default function FieldWrapper({
  children,
  title,
  className,
}: IComponent & { title: string }) {
  return (
    <label className={twMerge('flex flex-col', className)}>
      <span className="text-neutral-content">{title}</span>
      {children}
    </label>
  );
}

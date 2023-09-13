import { formatPrice, parseDateToArgentinianFormat } from '@/libs/utils';
import { IProduct } from '@/interfaces/IProduct';
import React from 'react';
import { IContainerProps, ISaleItemProps } from '@/interfaces/Sale.interfaces';
import { useSale } from '@/contexts/SaleContext';
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

export const Container = ({ children }: IContainerProps) => (
  <section className="alert flex flex-col font-semibold shadow-lx text-center bg-stone-50 shadow-lg w-full h-5/6 justify-start">
    {children}
  </section>
);

export const DateComponent = () => {
  const sale = useSale();

  return (
    <p className="text-s m-0 font-light ">
      {parseDateToArgentinianFormat(sale.createdAt)}
    </p>
  );
};

export const TotalItems = () => {
  const sale = useSale();

  return (
    <span className="flex flex-col">
      <p className="bold text-2xl">{formatPrice(sale.total)}</p>
      <Divider />
      <span>{sale.saleItems.length} productos</span>
    </span>
  );
};

export const SaleItem = ({ item }: ISaleItemProps) => {
  return (
    <li
      key={item.id}
      className="flex w-full flex-col items-center justify-between px-3"
    >
      <Divider />
      <span className="text-center text-sm font-thin  ">
        {(item?.product as IProduct)?.name}
      </span>
      <span>
        {item.quantity} x {formatPrice(item.price)}
      </span>
    </li>
  );
};

export const SaleItemsContainer = ({ children }: IContainerProps) => (
  <ul className="flex flex-col w-full ">{children}</ul>
);

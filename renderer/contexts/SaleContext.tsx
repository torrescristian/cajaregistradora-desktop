'use client';
import ISaleUI from '@/interfaces/ISale';
import React from 'react';

export const SaleContext = React.createContext<ISaleUI | null>(null);

export const useSale = () => {
  const sale = React.useContext(SaleContext);
  if (!sale) throw new Error('SaleContext not found');
  return sale;
};

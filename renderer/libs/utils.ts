import { DISCOUNT_TYPE } from '@/interfaces/IOrder';
import { PRODUCT_TYPE } from '@/interfaces/IProduct';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...classes: Array<string | null | undefined>) => {
  return twMerge(classes);
};

export const formatPrice = (price: number) => {
  if (price !== 0 && !price) return null;

  return price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
};

export const getErrorMessage = (error: any) => {
  return error?.error?.message || error?.error || error;
};

export const toPositiveNumber = (value: string | number) => {
  return Math.max(Number(value), 0);
};

export const parseDateToArgentinianFormat = (date?: Date | string) => {
  if (!date) return null;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return (
    dateObj.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' hs'
  );
};

export const createPayload = (data: any) => ({
  data,
});

export const toLC = (str: string) => str.toLowerCase();

export function range(end: number) {
  return Array.from({ length: end }, (_, i) => i);
}

interface ICalcDiscount {
  price: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
}

export function calcDiscount({
  price,
  discountAmount,
  discountType,
}: ICalcDiscount) {
  if (discountType === DISCOUNT_TYPE.FIXED) {
    return price - discountAmount;
  }
  return price * (1 - discountAmount / 100);
}

export const convertToEmoji = (productType?: PRODUCT_TYPE) => {
  switch (productType) {
    case 'PIZZA': {
      return '🍕';
    }
    case 'HAMBURGER': {
      return '🍔';
    }
    case 'SODA': {
      return '🥤';
    }
    default: {
      return '';
    }
  }
};

export const getUrlFromImage = (image:any) =>{
  return (image as unknown as any)?.formats?.thumbnail?.url || '/default.png'
}
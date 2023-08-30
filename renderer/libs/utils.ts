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

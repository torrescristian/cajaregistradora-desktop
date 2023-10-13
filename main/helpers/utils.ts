import { DISCOUNT_TYPE, IDiscount } from '../interfaces/IOrder';

export const formatPrice = (price: number) => {
  if (price !== 0 && !price) return null;

  return price.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });
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

export const discountToString = (discount: IDiscount) => {
  return discount.type === DISCOUNT_TYPE.FIXED
    ? formatPrice(discount.amount)
    : `${discount.amount}%`;
};

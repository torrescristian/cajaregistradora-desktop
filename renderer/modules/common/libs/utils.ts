import { ICartItem, IPromoItem } from '@/modules/cart/interfaces/ICart';
import {
  DISCOUNT_TYPE,
  IOrder,
  ORDER_STATUS,
} from '@/modules/ordenes/interfaces/IOrder';
import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
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

export function longRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface ICalcDiscount {
  price: number;
  discountAmount: number | string;
  discountType: DISCOUNT_TYPE;
}

export function calcDiscount({
  price,
  discountAmount,
  discountType,
}: ICalcDiscount) {
  if (discountType === DISCOUNT_TYPE.FIXED) {
    return price - Number(discountAmount);
  }
  return price * (1 - Number(discountAmount) / 100);
}

export const getUrlFromImage = (image: any) => {
  return (image as unknown as any)?.formats?.thumbnail?.url || '/default.png';
};

export const getStrapiUrl = () => {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://api.cajaregistradora.app'
  );
};

export function parsePromoItemsToCartItems(
  promoItems: IPromoItem[],
): ICartItem[] {
  const promosAsCartItems = promoItems.flatMap(({ selectedVariants }) =>
    selectedVariants.map(
      (variant) =>
        ({
          product: variant.product,
          selectedVariant: {
            ...variant,
            id: variant.id!,
            name: variant.name,
            price: variant.price,
            product: variant.product.id,
            stock_per_variant: variant.stock_per_variant!,
          },
          quantity: 1,
        }) as ICartItem,
    ),
  );
  return promosAsCartItems.reduce((acc, curr) => {
    const findItem = acc.find(
      (item: ICartItem) => item.selectedVariant.id === curr.selectedVariant.id,
    );
    if (findItem) {
      findItem.quantity += 1;
      return acc;
    }
    return [...acc, curr];
  }, [] as ICartItem[]);
}

export function getLabelByPaymentsType(payments: IPayment[]) {
  if (payments.length > 1) {
    return 'Mixto';
  }
  const payment = payments[0];
  switch (payment.type) {
    case PAYMENT_TYPE.CASH:
      return 'Efectivo';
    case PAYMENT_TYPE.CREDIT:
      return 'Crédito';
    case PAYMENT_TYPE.DEBIT:
      return 'Débito';
    default:
      return '';
  }
}

export function getPaymentsType(payment: IPayment) {
  switch (payment.type) {
    case PAYMENT_TYPE.CASH:
      return 'Efectivo';
    case PAYMENT_TYPE.CREDIT:
      return 'Crédito';
    case PAYMENT_TYPE.DEBIT:
      return 'Débito';
    default:
      return '';
  }
}

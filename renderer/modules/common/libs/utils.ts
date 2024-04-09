import { ICartItem, IPromoItem } from '@/modules/cart/interfaces/ICart';
import { DISCOUNT_TYPE, IDiscount } from '@/modules/ordenes/interfaces/IOrder';
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

export const discountToString = (discount?: IDiscount): string => {
  if (!discount) return formatPrice(0)!;

  return discount.type === DISCOUNT_TYPE.FIXED
    ? formatPrice(discount.amount)!
    : `${discount.amount}%`;
};

type RGBColor = [number, number, number];

export function suggestTextColor(
  background: string,
): 'text-white' | 'text-black' {
  // Convert hexadecimal color codes to RGB
  function hexToRgb(hex: string): RGBColor {
    return hex
      .match(/[A-Za-z0-9]{2}/g)!
      .map((v: string) => parseInt(v, 16)) as RGBColor;
  }

  // Calculate relative luminance
  function relativeLuminance(r: number, g: number, b: number): number {
    const RsRGB = r / 255;
    const GsRGB = g / 255;
    const BsRGB = b / 255;

    const R =
      RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    const G =
      GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    const B =
      BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  const [r, g, b] = hexToRgb(background);

  // Calculate relative luminance for white and black
  const LWhite = relativeLuminance(255, 255, 255);
  const LBlack = relativeLuminance(0, 0, 0);
  const LBackground = relativeLuminance(r, g, b);

  // Decide based on contrast ratio
  const contrastWithWhite = (LWhite + 0.05) / (LBackground + 0.05);
  const contrastWithBlack = (LBackground + 0.05) / (LBlack + 0.05);

  return contrastWithWhite >= contrastWithBlack ? 'text-white' : 'text-black';
}

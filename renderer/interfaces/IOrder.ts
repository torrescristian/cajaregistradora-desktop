import { IPromoItem } from './ICart';
import IClient from './IClient';
import { ICoupon } from './ICoupon';
import { IProduct } from './IProduct';
import { IVariant } from './IVariants';
import { IResponsePage, ISingleResultResponsePage } from './utils';

export interface IOrderItem<PRODUCT = IProduct, SELECTED_VARIANT = IVariant> {
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  product?: PRODUCT;
  selectedVariant: SELECTED_VARIANT;
}
export type IOrderItemPayload = IOrderItem<number, number>;

export interface IOrder<
  CLIENT = IClient,
  ORDER_ITEM = IOrderItem,
  COUPON = ICoupon,
> {
  additionalDetails: string;
  address?: string;
  client?: CLIENT;
  coupon?: COUPON;
  createdAt?: string;
  discount?: IDiscount;
  id?: number;
  items: ORDER_ITEM[];
  status: ORDER_STATUS;
  subtotalPrice: number;
  totalPrice: number;
  updatedAt?: string;
  promoItems: IPromoItem[];
}

export interface IDiscount {
  amount: number;
  type: DISCOUNT_TYPE;
}

export enum DISCOUNT_TYPE {
  PERC = 'perc',
  FIXED = 'fixed',
}
export type IOrderResponse = IResponsePage<IOrder>;

export type ISingleOrderResponse = ISingleResultResponsePage<IOrder>;

export type IOrderPayload = IOrder<number, number>;

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

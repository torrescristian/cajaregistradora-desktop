import IClient from '../../cart/interfaces/IClient';
import { ICoupon } from '../../cupones/interfaces/ICoupon';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant } from '../../common/interfaces/IVariants';
import {
  IResponsePage,
  ISingleResultResponsePage,
} from '@/modules/common/interfaces/utils';
import { IPromoItem } from '@/modules/cart/interfaces/ICart';
import { IDelivery } from '@/modules/cart/interfaces/IDelivery';
import { ITable } from './ITable';

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
  delivery?: IDelivery;
  table?: ITable;
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

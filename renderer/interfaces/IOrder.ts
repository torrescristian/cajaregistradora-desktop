import IClient from './IClient';
import IProduct, { IVariant } from './IProduct';
import { IResponsePage, ISingleResultResponsePage } from './utils';

export interface IOrderItem<PRODUCT = IProduct, SELECTED_VARIANT = IVariant> {
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  product?: PRODUCT;
  selectedVariant: SELECTED_VARIANT;
}

export interface IOrderUI<ORDER_ITEM = IOrderItem> {
  id?: number;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  totalPrice: number;
  additionalDetails: string;
  items: ORDER_ITEM[];
  createdAt?: string;
  updatedAt?: string;
  status: ORDER_STATUS;
}

export interface IOrder<CLIENT = IClient, ORDER_ITEM = IOrderItem> {
  items: ORDER_ITEM[];
  id?: number;
  total_price: number;
  additional_details: string;
  client: CLIENT;
  createdAt?: string;
  updatedAt?: string;
  status: ORDER_STATUS;
}
export type IOrderResponse = IResponsePage<IOrder>;
export type IOrderSingleResponse = ISingleResultResponsePage<IOrder>;

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

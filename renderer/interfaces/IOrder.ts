import IClient from './IClient';
import IProduct, { IVariant } from './IProduct';
import { IResponsePage, ISingleResultResponsePage } from './utils';

export interface IOrderItem<PRODUCT = number, SELECTED_VARIANT = number> {
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  product?: PRODUCT;
  selectedVariant: SELECTED_VARIANT;
}

export type IOrderItemExpanded = IOrderItem<IProduct, IVariant>;

export interface IOrderUI<ORDER_ITEM = IOrderItemExpanded> {
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

export interface IOrder<CLIENT = number, ORDER_ITEM = IOrderItem> {
  items: ORDER_ITEM[];
  id?: number;
  total_price: number;
  additional_details: string;
  client: CLIENT;
  createdAt?: string;
  updatedAt?: string;
  status: ORDER_STATUS;
}
export type IOrderExpanded = IOrder<IClient, IOrderItemExpanded>;
export type IOrderResponseExpanded = IResponsePage<IOrderExpanded>;
export type IOrderResponse = IResponsePage<IOrder<IClient>>;
export type IOrderSingleResponse = ISingleResultResponsePage<IOrder<IClient>>;

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

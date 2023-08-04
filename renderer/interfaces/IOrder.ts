import IClient from './IClient';
import IProduct from './IProduct';
import { IResponsePage } from './utils';

export interface IOrderItem {
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  product: IProduct | number;
}

export interface IOrderUI {
  id?: number;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  totalPrice: number;
  items: IOrderItem[];
  additionalDetails: string;
}

export interface IOrder {
  items: IOrderItem[];
  id?: number;
  total_price: number;
  client: number | IClient;
  additional_details: string;
  createAt?: string;
  updatedAt?: string;
}

export type IOrderResponse = IResponsePage<IOrder>;

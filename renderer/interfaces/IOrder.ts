import IProduct from './IProduct';
import { IResponsePage } from './utils';

export interface IOrderItem {
  id?: number;
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
  totalPrice: number;
  items: IOrderItem[];
}

export interface IOrder {
  items: IOrderItem[];
  id?: number;
  total_price: number;
  client: {
    name: string;
    phone_number: string;
    address: string;
    id?: number;
  };
  createAt?: string;
  updatedAt?: string;
}

export type IOrderResponse = IResponsePage<IOrder>

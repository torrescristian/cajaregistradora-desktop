import IProduct from './IProduct';

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
  };
  createAt?: string;
  updatedAt?: string;
}

export default interface IOrderResponse {
  id: number;
  attributes: {
    client: {
      name: string;
      phone_number: string;
    };
    createAt: string;
    total_price: number;
    updatedAt: string;
  };
}

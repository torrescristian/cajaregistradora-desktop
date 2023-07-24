import { IProduct } from './IProduct';
import { IResponsePage } from './utils';

export interface IProductsSold {
  quantity: number;
  product: IProduct | number;
}

export interface ICashBalance {
  id?: number;
  total_amount: number;
  products_sold: IProductsSold[];
  createdAt?: string;
  updatedAt?: string;
}

export type ICashBalancePage = IResponsePage<ICashBalance>;

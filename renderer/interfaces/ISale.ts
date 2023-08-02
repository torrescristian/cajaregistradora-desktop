import { IProduct } from './IProduct';
import { IFixedNativeResponse, INativeResponse, IResponsePage } from './utils';

export interface ISaleItem {
  id?: number;
  quantity: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  product: IProduct | number;
}

export interface ISale {
  id?: number;
  total_price: number;
  createdAt?: string;
  updatedAt?: string;
  sale_items: ISaleItem[];
}

export type ISalePage = IResponsePage<ISale>;

export interface ISalePayload {
  data: ISale;
}

export default interface ISaleUI {
  id: number;
  total: number;
  createdAt: string;
  saleItems: ISaleItem[];
}

export type ISaleNativeResponse = IFixedNativeResponse<ISale>;

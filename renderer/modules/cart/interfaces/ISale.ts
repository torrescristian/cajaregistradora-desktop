import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IStrapiResponse, IResponsePage } from '@/modules/common/interfaces/utils';

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

export type ISaleNativeResponse = IStrapiResponse<ISale>;

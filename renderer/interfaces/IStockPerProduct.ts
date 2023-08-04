import { IProduct } from './IProduct';
import { IResponsePage } from './utils';

export type IStockPerProductPages = IResponsePage<IStockPerProduct>;

export default interface IStockPerProduct {
  id: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

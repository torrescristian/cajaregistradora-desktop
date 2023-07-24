import { IProduct } from './IProduct';
import { IResponsePage } from './utils';

export type IStockPerProductPages = IResponsePage<IStockPerProduct>;

export default interface IStockPerProduct {
  id: number;
  name: string;
  stock_amount_per_product: number;
  sales_amount_per_product: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

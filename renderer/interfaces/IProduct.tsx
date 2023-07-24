import { ICategory } from './ICategory';
import IStockPerProduct from './IStockPerProduct';
import { IResponsePage } from './utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}
export interface IStockPerVariant {
  id: number;
  variant: number;
  stock_amount_per_variant: number;
  sales_amount_per_variant: number;
}
export interface IVariant {
  id: number;
  categories: ICategory[] | number[];
  product: number;
  stock_per_variant: IStockPerVariant;
}

export interface IVariantPayload {
  categories: number[];
  product: number;
  stock_per_variant: number;
}

export interface IVariantUI {
  id: number;
  categories: ICategory[];
  stock: number;
  stock_per_variant: IStockPerVariant;
}

export interface IProduct {
  id: number;
  isService: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
  stock_per_product: IStockPerProduct;
  categories: ICategory[];
  store: number;
  variants: IVariant[];
  public_price: number;
  wholesale_price: number;
  catalog_price: number;
  special_price: number;
  image: string;
}

export type IProductPage = IResponsePage<IProduct>;

export interface IProductUpdate {
  data: Partial<IProduct>;
}

export default interface IProductUI {
  id: number;
  name: string;
  disabled?: boolean;
  isService: boolean;
  variants: IVariantUI[];
  public_price: number;
  wholesale_price: number;
  catalog_price: number;
  special_price: number;
  image: string;
  stock: number;
  price: number;
  stock_per_product: IStockPerProduct;
}

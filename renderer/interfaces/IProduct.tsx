import { ICategory } from './ICategory';
import IStockPerVariant from './IStockPerVariant';
import { IResponsePage } from './utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export interface IVariant {
  id: number;
  product: number;
  stock_per_variant: IStockPerVariant;
  price: number;
  name: string;
}

export interface IVariantPayload {
  categories: number[];
  product: number;
  stock_per_variant: number;
}

export interface IVariantUI {
  id: number;
  product:number;
  price:number;
  stockPerVariant: IStockPerVariant;
  name: string;
}

export interface IProduct<DEFAULT_VARIANT = number> {
  id: number;
  name: string;
  categories: ICategory[];
  store: number;
  isService: boolean;
  variants: IVariant[];
  default_variant: DEFAULT_VARIANT;
  image: string;
  type: string;
  updatedAt: string;
  createdAt: string;
}

export type IProductExpanded = IProduct<IVariant>
export type IProductPage = IResponsePage<IProduct<IVariant>>;

export interface IProductUpdate {
  data: Partial<IProduct>;
}

export default interface IProductUI {
  id: number;
  name: string;
  categories: ICategory[];
  store: number;
  isService: boolean;
  variants: IVariantUI[];
  image: string;
  defaultVariant: IVariantUI;
  type : string;
  disabled?: boolean;
}

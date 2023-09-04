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
  product: number;
  price: number;
  stockPerVariant: IStockPerVariant;
  name: string;
}

export interface IProduct<DEFAULT_VARIANT = IVariant, VARIANTS = IVariant> {
  id: number;
  name: string;
  categories: ICategory[];
  store: number;
  isService: boolean;
  variants: VARIANTS[];
  default_variant: DEFAULT_VARIANT;
  image: string;
  type: PRODUCT_TYPE;
  updatedAt: string;
  createdAt: string;
}

export type IProductPage = IResponsePage<IProduct<IVariant>>;

export interface IProductUpdate {
  data: Partial<IProduct>;
}

export type PRODUCT_TYPE = 'SODA' | 'PIZZA' | 'HAMBURGER' | 'PAPAS';

export default interface IProductUI {
  id: number;
  name: string;
  categories: ICategory[];
  store: number;
  isService: boolean;
  variants: IVariantUI[];
  image: string;
  defaultVariant: IVariantUI;
  type: PRODUCT_TYPE;
  disabled?: boolean;
}

export type IProductPayload = IProduct<number, number>;

import IStockPerVariant from './IStockPerVariant';
import { IResponsePage } from './utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export interface IVariant<STOCK_PER_VARIANT = IStockPerVariant> {
  id?: number;
  product: number;
  stock_per_variant: STOCK_PER_VARIANT;
  price: number;
  name: string;
}

export type IVariantPayload = IVariant<number>;

export interface IProduct<DEFAULT_VARIANT = IVariant, VARIANTS = IVariant> {
  id?: number;
  name: string;
  variants: VARIANTS[];
  store: number;
  isService: boolean;
  default_variant: DEFAULT_VARIANT;
  image: string;
  type: PRODUCT_TYPE;
  updatedAt?: string;
  createdAt?: string;
}

export type IProductPage = IResponsePage<IProduct<IVariant>>;

export interface IProductUpdate {
  data: Partial<IProduct>;
}

export type PRODUCT_TYPE = 'SODA' | 'PIZZA' | 'HAMBURGER';

export type IProductPayload = IProduct<number, number>;

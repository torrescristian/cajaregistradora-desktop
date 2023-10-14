import { IVariant } from './IVariants';
import { IResponsePage } from './utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export interface IProduct<DEFAULT_VARIANT = IVariant, VARIANTS = IVariant[],PRODUCT_TYPE = IProductTypePayload> {
  id?: number;
  name: string;
  variants: VARIANTS;
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
export interface IProductType<PRODUCTS = IProduct[]>{
  id?: number;
  name: string;
  product: PRODUCTS;
  emoji: string;
}
export type IProductPayload = IProduct<number, number>;
export type IProductTypePayload = IProductType<number[]>; 
export type IProductTypeResponse = IResponsePage<IProductType>;
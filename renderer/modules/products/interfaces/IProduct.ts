import { IVariant } from '../../common/interfaces/IVariants';
import { IResponsePage } from '@/modules/common/interfaces/utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export interface IProduct<
  DEFAULT_VARIANT = IVariant,
  VARIANTS = IVariant[],
  PRODUCT_TYPE = IProductTypePayload,
> {
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
  status: PRODUCT_STATUS;
}

export type IProductPage = IResponsePage<IProduct<IVariant>>;
export interface IProductUpdate {
  data: Partial<IProduct>;
}
export interface IProductType<PRODUCTS = IProduct[]> {
  id?: number;
  name: string;
  product: PRODUCTS;
  emoji: string;
}
export type IProductPayload = IProduct<number, number, number>;
export type IProductTypePayload = IProductType<number[]>;
export type IProductTypeResponse = IResponsePage<IProductType>;
export enum PRODUCT_STATUS {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

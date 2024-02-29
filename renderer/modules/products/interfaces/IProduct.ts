import { IVariant } from '../../common/interfaces/IVariants';
import { IResponsePage } from '@/modules/common/interfaces/utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export enum MEASURE_UNIT {
  UNIT = 'UNIT',
  KILOGRAM = 'KILOGRAM',
  METER = 'METER',
  LITER = 'LITER',
  PACKAGE = 'PACKAGE',
  DOZEN = 'DOZEN',
  GRAM = 'GRAM',
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
  image?: string;
  type: PRODUCT_TYPE;
  updatedAt?: string;
  createdAt?: string;
  description: string;
  status: PRODUCT_STATUS;
  measureUnit: MEASURE_UNIT;
}

export type IProductPage = IResponsePage<IProduct>;
export interface IProductUpdate {
  data: Partial<IProduct>;
}
export interface IProductType<PRODUCTS = IProduct[]> {
  id?: number;
  name: string;
  product: PRODUCTS;
  emoji: string;
  image?: string;
}
export type IProductPayload = IProduct<number, number, number>;
export type IProductTypePayload = IProductType<number[]>;
export type IProductTypeResponse = IResponsePage<IProductType>;
export enum PRODUCT_STATUS {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

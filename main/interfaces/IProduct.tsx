import { IVariant } from './IVariants';
import { IResponsePage } from './utils';

export interface IAditionalPrice {
  id: number;
  name: string;
  amount: number;
}

export interface IProduct<DEFAULT_VARIANT = IVariant, VARIANTS = IVariant[]> {
  id?: number;
  name: string;
  variants: VARIANTS;
  store: number;
  isService: boolean;
  default_variant: DEFAULT_VARIANT;
  image: string;
  type: string;
  updatedAt?: string;
  createdAt?: string;
  measureUnit?: unitType;
}

export enum unitType {
  UNIT = 'UNIT',
  KILOGRAM = 'KILOGRAM',
  METER = 'METER',
  LITER = 'LITER',
  PACKAGE = 'PACKAGE',
  DOZEN = 'DOZEN',
  GRAM = 'GRAM',
}

export type IProductPage = IResponsePage<IProduct<IVariant>>;
export interface IProductUpdate {
  data: Partial<IProduct>;
}

export type IProductPayload = IProduct<number, number>;

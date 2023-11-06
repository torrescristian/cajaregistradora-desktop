import { IProduct } from './IProduct';
import { IVariant, IVariantExpanded } from './IVariants';
import { IResponsePage } from './utils';

export interface ICategory<VARIANT = IVariant<null, IProduct>[]> {
  id?: number;
  name: string;
  variants: VARIANT;
  store?: number;
}

export type ICategoryPayload = ICategory<number[]>;

export type ICategoryPage = IResponsePage<ICategory>;

export type ICategoryResponse = IResponsePage<ICategoryExpanded>;

export type ICategoryExpanded = ICategory<IVariantExpanded[]>;

import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant, IVariantExpanded } from '../../common/interfaces/IVariants';
import { IResponsePage } from '@/modules/common/interfaces/utils';

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

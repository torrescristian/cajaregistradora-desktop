import { ICategory } from './ICategory';
import { IProduct } from './IProduct';
import { IVariant, IVariantPromo } from './IVariants';
import { IFixedNativeResponse } from './utils';

export interface IPromo<VARIANT = IVariant<null,string>[], CATEGORIES = ICategory<IVariant<null,string>[]>[]> {
  id?: number;
  variants: VARIANT;
  categories: CATEGORIES;
  name: string;
  price: number;
}

export type IVariantExpanded = IFixedNativeResponse<IVariantPromo>;

export type ICategoryExpanded = IFixedNativeResponse<ICategory<IVariantExpanded>>

export type IPromoResponse = IFixedNativeResponse<
  IPromo<
    IVariantExpanded,
    ICategoryExpanded
  >
>;

import { ICategory } from './ICategory';
import { IVariantExpanded, IVariantPromo } from './IVariants';
import { IResponsePage } from './utils';

export interface IPromo<
  VARIANT = IVariantPromo,
  CATEGORY = ICategory<IVariantPromo[]>,
> {
  id?: number;
  variants: IVariantAndQuantity<VARIANT>[];
  categories: ICategoryAndQuantity<CATEGORY>[];
  name: string;
  price: number;
}

export interface ICategoryAndQuantity<CATEGORY = ICategory> {
  category: CATEGORY;
  quantity: number;
}

export interface IVariantAndQuantity<VARIANT = IVariantPromo> {
  variant: VARIANT;
  quantity: number;
}

export type IPromoExpanded = IPromo<
  IVariantExpanded,
  ICategory<IVariantExpanded[]>
>;
export type IPromoResponse = IResponsePage<IPromoExpanded>;

export type IPromoPayload = IPromo<number, number>;

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
  status: PROMO_STATUS;
}

export interface ICategoryAndQuantity<
  CATEGORY = ICategory<IVariantExpanded[]>,
> {
  category: CATEGORY;
  quantity: number;
}

export interface IVariantAndQuantity<VARIANT = IVariantExpanded> {
  variant: VARIANT;
  quantity: number;
}

export type IPromoExpanded = IPromo<
  IVariantExpanded,
  ICategory<IVariantExpanded[]>
>;
export type IPromoResponse = IResponsePage<IPromoExpanded>;

export type IPromoPayload = IPromo<number, number>;

export enum PROMO_STATUS {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

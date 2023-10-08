import { ICategory } from './ICategory';
import { IVariant, IVariantPromo } from './IVariants';
import { IResponsePage, IStrapiResponse, IStrapiSingleResponse } from './utils';

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

export type IPromoResponse = IResponsePage<
  IPromo<IVariantPromo, ICategory<IVariantPromo[]>>
>;

export type IPromoPayload = IPromo<number, number>;

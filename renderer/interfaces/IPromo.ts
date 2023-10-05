import { ICategory } from './ICategory';
import { IVariant, IVariantPromo } from './IVariants';
import { IStrapiResponse, IStrapiSingleResponse } from './utils';

export interface IPromo<
  VARIANT = IVariantWithProductName,
  CATEGORY = ICategory<IVariantWithProductName[]>,
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

export interface IVariantAndQuantity<VARIANT = IVariant> {
  variant: VARIANT;
  quantity: number;
}

export type IVariantExpanded = IStrapiSingleResponse<IVariantPromo>;

export type ICategoryExpanded = IStrapiSingleResponse<
  ICategory<IStrapiResponse<IVariantPromo>>
>;

export type IPromoResponse = IStrapiResponse<
  IPromo<IVariantExpanded, ICategoryExpanded>
>;

export type IPromoPayload = IPromo<number, number>;

export type IVariantWithProductName = IVariant<null, string>;

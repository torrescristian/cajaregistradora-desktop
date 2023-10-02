import { IProduct } from './IProduct';
import { IVariant } from './IVariants';
import { IStrapiResponse, IResponsePage, IStrapiSingleResponse } from './utils';

export interface ICategory<VARIANT = IVariant<null, IProduct>[]> {
  id?: number;
  name: string;
  variants: VARIANT;
  store?: number;
}

export type ICategoryPayload = ICategory<number[]>;

export type ICategoryPage = IResponsePage<ICategory>;

export type ICategoryResponse = IStrapiResponse<
  ICategory<IStrapiResponse<IVariant<null, IProduct>>>
>;

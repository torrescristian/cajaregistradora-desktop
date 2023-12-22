import { IProduct } from '@/modules/products/interfaces/IProduct';
import IStockPerVariant from '@/modules/ordenes/interfaces/IStockPerVariant';
import { IResponsePage, IStrapiResponse } from './utils';

export interface IVariant<
  STOCK_PER_VARIANT = IStockPerVariant,
  PRODUCT = number,
  CATEGORIES = number[],
> {
  id?: number;
  product: PRODUCT;
  stock_per_variant?: STOCK_PER_VARIANT;
  price: number;
  name: string;
  minimum_stock?: number;
  categories?: CATEGORIES;
  status: STATUS_VARIANTS;
}

export enum STATUS_VARIANTS {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}
// export type IProductPromo = IProduct;
export type IVariantPromo = IVariant<IStockPerVariant, IProduct>;
export type IVariantPayload = IVariant<number>;
export type IVariantResponse = IResponsePage<IVariant>;
export type IVariantExpanded = IVariant<IStockPerVariant, IProduct>;
export type IVariantExpandedResponse = IResponsePage<IVariantExpanded>;

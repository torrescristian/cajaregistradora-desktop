import { IProduct } from './IProduct';
import IStockPerVariant from './IStockPerVariant';
import { IStrapiResponse, IStrapiSingleResponse } from './utils';

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
}
// export type IProductPromo = IProduct;
export type IVariantPromo = IVariant<null,IProduct>
export type IVariantPayload = IVariant<number>;
export type IVariantResponse = IStrapiResponse<IVariant>;

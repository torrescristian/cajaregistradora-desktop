import { IProduct } from './IProduct';
import IStockPerVariant from './IStockPerVariant';
import { IFixedNativeResponse, ISingleFixedNativeResponse } from './utils';

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
export type IVariantPromo = IVariant<
  null,
  ISingleFixedNativeResponse<IProduct>
>;
export type IVariantPayload = IVariant<number>;
export type IVariantResponse = IFixedNativeResponse<IVariant>;

import { IFixedNativeResponse } from "./utils";

export type IStockPerVariantPages = IFixedNativeResponse<IStockPerVariant>;

export default interface IStockPerVariant {
  id?: number;
  variant: number;
  stock: number;
  updateAt?: string;
  createAt?: string;
}

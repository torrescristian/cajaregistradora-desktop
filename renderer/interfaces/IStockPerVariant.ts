import { IStrapiResponse } from './utils';

export type IStockPerVariantPages = IStrapiResponse<IStockPerVariant>;

export default interface IStockPerVariant {
  id?: number;
  variant: number;
  stock: number;
  updateAt?: string;
  createAt?: string;
}

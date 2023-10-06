import { IResponsePage} from './utils';

export type IStockPerVariantPages = IResponsePage<IStockPerVariant>;

export default interface IStockPerVariant {
  id?: number;
  variant: number;
  stock: number;
  updateAt?: string;
  createAt?: string;
}

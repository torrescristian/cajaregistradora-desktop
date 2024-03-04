import {
  IResponsePage,
  ISingleResultResponsePage,
} from '@/modules/common/interfaces/utils';
import { IOrder } from './IOrder';
import { ICategory } from '@/modules/categorias/interfaces/ICategory';

export interface ITable {
  id?: number;
  code: string;
  order: IOrder;
  category: ICategory;
  status: TABLE_STATUS;
}

export enum TABLE_STATUS {
  DISABLED = 'DISABLED',
  FREE = 'FREE',
  TAKEN = 'TAKEN',
}

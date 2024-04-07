import IStore from '@/modules/common/interfaces/IStore';

import { IOrder } from './IOrder';

export interface ITable {
  id?: number;
  code: string;
  order: IOrder;
  category: ITableCategory;
  status: TABLE_STATUS;
  store?: IStore;
}

export interface ITableCategory {
  id: number;
  name: string;
  color: string;
  store?: IStore;
}

export interface ITablePayload {
  code: string;
  category: number;
  status: TABLE_STATUS;
}

export interface ITakeTableOrderPayload {
  table: number;
  order: number;
}

export enum TABLE_STATUS {
  DISABLED = 'DISABLED',
  FREE = 'FREE',
  TAKEN = 'TAKEN',
}

export interface ITableCategoryPayload {
  name: string;
  color: string;
}

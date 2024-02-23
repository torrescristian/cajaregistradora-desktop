import { ICashBalance } from './ICashBalance';
import IStore from '@/modules/common/interfaces/IStore';
import { IResponsePage } from '@/modules/common/interfaces/utils';

export interface INewAddBalance<CASH_BALANCE = ICashBalance> {
  id?: number;
  amount: number;
  reason: string;
  cashBalance: CASH_BALANCE;
  store?: IStore;
  status: STATUS_ADD_BALANCE;
  type: IAddNewBalanceType;
  createdAt?: string;
}

export interface IAddNewBalanceType {
  id?: number;
  name: string;
  store?: IStore;
}

export enum STATUS_ADD_BALANCE {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type IAddNewBalanceResponse = IResponsePage<INewAddBalance>;
export type IAddNewBalanceTypesResponse = IResponsePage<IAddNewBalanceType>;

import { ICashBalance } from './ICashBalance';
import IStore from '@/modules/common/interfaces/IStore';
import { IResponsePage } from '@/modules/common/interfaces/utils';

export interface INewAddBalance<CASH_BALANCE = ICashBalance> {
  id?: number;
  amount: number;
  reason: string;
  cashBalance: ICashBalance;
  store?: IStore;
}

export interface IAddNewBalanceType {
  id?: number;
  amount: number;
  reason: string;
  cashBalance: ICashBalance;
  store?: IStore;
}

export type IAddNewBalanceResponse = IResponsePage<INewAddBalance>;
export type IAddNewBalanceTypesResponse = IResponsePage<IAddNewBalanceType>;

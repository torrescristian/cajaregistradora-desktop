import { IResponsePage } from '@/modules/common/interfaces/utils';
import { ICashBalance } from './ICashBalance';
import IStore from '@/modules/common/interfaces/IStore';

export interface IExpense<CASH_BALANCE = ICashBalance> {
  id?: number;
  amount: number;
  reason: string;
  cashBalance: CASH_BALANCE;
  store?: IStore;
  status: STATUS_EXPENSE;
  type: IExpenseType;
  createdAt?: string;
}

export interface IExpenseType {
  id?: number;
  name: string;
  store?: IStore;
}

export enum STATUS_EXPENSE {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export type IExpensesResponse = IResponsePage<IExpense>;
export type IExpenseTypesResponse = IResponsePage<IExpenseType>;

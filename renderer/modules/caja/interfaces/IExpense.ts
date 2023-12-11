import { IResponsePage } from '@/modules/common/interfaces/utils';
import { ICashBalance } from './ICashBalance';

export interface IExpense<CASH_BALANCE = ICashBalance> {
  id?: number;
  createdAt: string;
  reason: string;
  amount: number;
  cashBalance: CASH_BALANCE;
}

export type IExpensesResponse = IResponsePage<IExpense>;

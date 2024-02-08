import { ITicket } from './ITicket';
import IUser from './IUser';
import { IResponsePage } from './utils';
export interface ICashBalance<
  TICKET = ITicket<number, number>,
  USER = IUser,
  COMPLETED_AT = Date,
> {
  completedAt: COMPLETED_AT;
  digitalCashAmount: number;
  id?: number;
  initialCashAmount: number;
  newCashAmount: number;
  seller: USER;
  ticket: TICKET;
  totalAmount: number;
  totalExpense: number;
}

export type ICashBalanceExpanded = ICashBalance<ITicket>;

export type ICashBalancePage = IResponsePage<ICashBalanceExpanded>;

import { ITicket } from './ITicket';
import IUser from './IUser';
import {IFixedNativeResponse} from './utils';
export interface ICashBalance<TICKET = ITicket<number,number>,USER = IUser, COMPLETED_AT = Date  > {
  id?: number;
  completedAt: COMPLETED_AT;
  initialCashAmount: number;
  newCashAmount: number;
  seller: USER;
  ticket: TICKET;
}

export type ICashBalanceExpanded = ICashBalance<ITicket>

export type ICashBalancePage = IFixedNativeResponse<ICashBalanceExpanded>;

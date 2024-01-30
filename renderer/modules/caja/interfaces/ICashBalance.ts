import { IPayment, ITicket } from '@/modules/recibos/interfaces/ITicket';
import IUser from '../../common/interfaces/IUser';
import { IResponsePage } from '@/modules/common/interfaces/utils';
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
  refunds: IRefund[];
  seller: USER;
  tickets: TICKET[];
  totalAmount: number;
}

export interface IRefund<TICKET = ITicket> {
  ticket: TICKET;
  payment: IPayment;
}

export type ICashBalanceExpanded = ICashBalance<ITicket>;

export type ICashBalancePage = IResponsePage<ICashBalanceExpanded>;

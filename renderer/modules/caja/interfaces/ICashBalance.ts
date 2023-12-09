import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import IUser from '../../common/interfaces/IUser';
import { IResponsePage } from '@/modules/common/interfaces/utils';
export interface ICashBalance<
  TICKET = ITicket<number, number>,
  USER = IUser,
  COMPLETED_AT = Date,
> {
  id?: number;
  completedAt: COMPLETED_AT;
  initialCashAmount: number;
  newCashAmount: number;
  seller: USER;
  tickets: TICKET[];
  totalAmount: number;
}

export type ICashBalanceExpanded = ICashBalance<ITicket>;

export type ICashBalancePage = IResponsePage<ICashBalanceExpanded>;

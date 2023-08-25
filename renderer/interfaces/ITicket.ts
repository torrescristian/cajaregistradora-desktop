import { ICashBalance } from './ICashBalance';
import { IOrder } from './IOrder';
import { IResponsePage } from './utils';

export type ITicketResponse = IResponsePage<ITicket>;

export enum TICKET_STATUS {
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  WAITING_FOR_REFUND = 'WAITING_FOR_REFUND',
}

export interface ITicket<ORDER = IOrder, CASH_BALANCE = ICashBalance> {
  id?: number;
  total_price: number;
  order: ORDER;
  status: TICKET_STATUS;
  cash_balance: CASH_BALANCE;
}

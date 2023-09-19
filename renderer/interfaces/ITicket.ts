import { ICashBalance } from './ICashBalance';
import { IOrder } from './IOrder';
import { IResponsePage } from './utils';

export interface IPayment {
  amount: number | '';
  type: PAYMENT_TYPE;
}

export enum PAYMENT_TYPE {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export type ITicketResponse = IResponsePage<ITicket>;

export enum TICKET_STATUS {
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  WAITING_FOR_REFUND = 'WAITING_FOR_REFUND',
}

export interface ITicket<ORDER = IOrder, CASH_BALANCE = ICashBalance> {
  id?: number;
  totalPrice: number;
  order: ORDER;
  status: TICKET_STATUS;
  cashBalance: CASH_BALANCE;
  payments: IPayment[];
}

export type ITicketPayload = ITicket<number, number>;

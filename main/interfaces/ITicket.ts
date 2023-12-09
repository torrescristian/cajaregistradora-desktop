import { ICashBalance } from './ICashBalance';
import { IOrder } from './IOrder';
import IStore from './IStore';
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
  cashBalance: CASH_BALANCE;
  createdAt?: string;
  couponDiscount: number;
  id?: number;
  order: ORDER;
  payments: IPayment[];
  status: TICKET_STATUS;
  totalPrice: number;
  store: IStore;
}

export type ITicketPayload = ITicket<number, number>;

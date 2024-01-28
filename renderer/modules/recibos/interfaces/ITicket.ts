import { ICashBalance } from '../../caja/interfaces/ICashBalance';
import { IOrder } from '../../ordenes/interfaces/IOrder';
import { IResponsePage } from '@/modules/common/interfaces/utils';

export interface IPayment {
  uuid?: string;
  amount: number | '';
  type: PAYMENT_TYPE;
}

export enum PAYMENT_TYPE {
  CASH = 'CASH',
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
  couponDiscount: number;
  id?: number;
  order: ORDER;
  payments: IPayment[];
  status: TICKET_STATUS;
  totalPrice: number;
}

export type ITicketPayload = ITicket<number, number>;

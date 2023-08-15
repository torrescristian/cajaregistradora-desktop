import {  IOrderExpanded } from './IOrder';
import { IResponsePage } from './utils';

export type ITicketResponse = IResponsePage<ITicket>;
export type ITicketResponseExpanded = IResponsePage<ITicketExpanded>;

export enum TICKET_STATUS {
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  WAITING_FOR_REFUND = 'WAITING_FOR_REFUND',
}

export interface ITicket<ORDER = number> {
  id?: number;
  total_price: number;
  order: ORDER;
  status: TICKET_STATUS;
}

export type ITicketExpanded = ITicket<IOrderExpanded>;

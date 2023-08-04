import { IOrder } from "./IOrder";
import { IResponsePage } from "./utils";

export type ITicketResponse = IResponsePage<ITicket>;

export enum TICKET_STATUS {
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  WAITING_FOR_REFUND = 'WAITING_FOR_REFUND',
}

export default interface ITicket {
  id?: number;
  date: string;
  total_price: number;
  order: number | IOrder;
  status: TICKET_STATUS;
}

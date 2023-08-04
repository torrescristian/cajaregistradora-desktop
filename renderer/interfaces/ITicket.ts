import { IOrder } from './IOrder';
import { IResponsePage } from './utils';

export type ITicketResponse = IResponsePage<ITicket>;

export default interface ITicket {
  id?: number;
  date: string;
  total_price: number;
  order: number | IOrder;
}

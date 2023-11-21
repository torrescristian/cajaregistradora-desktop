import { ITicket, TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';

export interface IColumnTicket {
  ticket: ITicket;
  state: TICKET_STATUS;
  totalPrice: number;
  date: string;
  client: string;
  direction: string;
  phone_number: string;
  subtotalPrice: number;
  paymentType: string;
}

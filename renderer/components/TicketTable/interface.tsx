import { ITicket, TICKET_STATUS } from '@/interfaces/ITicket';

export interface IColumn {
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

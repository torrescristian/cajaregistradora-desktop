import { TICKET_STATUS } from '@/interfaces/ITicket';

export interface IColumn {
  id: number;
  state: TICKET_STATUS;
  totalPrice: number;
  date: string;
  client: string;
  direction: string;
  phone_number: string;
  subtotalPrice: number;
  paidInCash: number;
  paidInDebit: number;
  paidInCredit: number;
}

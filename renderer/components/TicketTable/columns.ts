import { TICKET_STATUS } from '@/interfaces/ITicket';
import { formatPrice } from '@/libs/utils';
import { IColumn } from './interface';

function statusTranslate(ticketStatus: TICKET_STATUS) {
  switch (ticketStatus) {
    case TICKET_STATUS.PAID:
      return 'Pagado';
    case TICKET_STATUS.REFUNDED:
      return 'Reembolsado';
    case TICKET_STATUS.WAITING_FOR_REFUND:
      return 'Esperando reembolso';
    default:
      return '';
  }
}

export const columnsDef = [
  {
    accessorKey: 'id',
    header: 'Código ID',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorFn: (col: IColumn) => `${formatPrice(col.totalPrice)}`,
    header: 'Total',
  },
  {
    accessorFn: (row: any) => `${statusTranslate(row.state)}`,
    header: 'Estado',
  },
  {
    accessorKey: 'client',
    header: 'Cliente',
  },
  {
    accessorKey: 'direction',
    header: 'Dirección',
  },
  {
    accessorKey: 'phone_number',
    header: 'Número de teléfono',
  },
  {
    accessorFn: (col: IColumn) => `${formatPrice(col.subtotalPrice)}`,
    header: 'Subtotal',
  },
  {
    accessorFn: (col: IColumn) => `${formatPrice(col.paidInCash)}`,
    header: 'Págado en Efectivo',
  },
  {
    accessorFn: (col: IColumn) => `${formatPrice(col.paidInDebit)}`,
    header: 'Págado en Débito',
  },
  {
    accessorFn: (col: IColumn) => `${formatPrice(col.paidInCredit)}`,
    header: 'Pagado en Crédito',
  },
];

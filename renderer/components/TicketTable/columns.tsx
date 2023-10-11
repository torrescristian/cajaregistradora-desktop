import { TICKET_STATUS } from '@/interfaces/ITicket';
import { formatPrice } from '@/libs/utils';
import { IColumn } from './interface';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteTicketModal } from '../DeleteTicketModal';

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

const customPriceFormat = (value: any) =>
  Number(value) === 0 ? '-' : `${formatPrice(value)}`;

const columnHelper = createColumnHelper<IColumn>();

export const columnsDef = [
  {
    accessorFn: (col: IColumn) => col.ticket.id,
    header: 'Código ID',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorFn: (col: IColumn) => customPriceFormat(col.totalPrice),
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
    accessorFn: (col: IColumn) => `${customPriceFormat(col.subtotalPrice)}`,
    header: 'Subtotal',
  },
  {
    accessorFn: (col: IColumn) => `${customPriceFormat(col.paidInCash)}`,
    header: 'Págado en Efectivo',
  },
  {
    accessorFn: (col: IColumn) => `${customPriceFormat(col.paidInDebit)}`,
    header: 'Págado en Débito',
  },
  {
    accessorFn: (col: IColumn) => `${customPriceFormat(col.paidInCredit)}`,
    header: 'Pagado en Crédito',
  },
  columnHelper.display({
    header: 'Reembolsar',
    cell: (props) => <DeleteTicketModal ticket={props.row.original.ticket} />,
  }),
];

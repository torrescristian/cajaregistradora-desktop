import { TICKET_STATUS } from '@/interfaces/ITicket';
import { formatPrice } from '@/libs/utils';
import { IColumn } from './interface';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteTicketModal } from '../DeleteTicketModal';
import { MoreInfoModal } from '../MoreInfoModal';

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
    accessorFn: (col: IColumn) => col.ticket.order.id,
    header: 'Nro de orden',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorFn: (row: any) => `${statusTranslate(row.state)}`,
    header: 'Estado',
  },
  {
    accessorFn: (col: IColumn) => col.client || '-',
    header: 'Cliente',
  },
  {
    accessorFn: (col: IColumn) => customPriceFormat(col.totalPrice),
    header: 'Total',
  },
  {
    accessorFn: (col: IColumn) => col.paymentType,
    header: 'Método de pago',
  },
  columnHelper.display({
    header: 'Detalles',
    cell: (props) => <MoreInfoModal ticket={props.row.original.ticket} />,
  }),
  columnHelper.display({
    header: 'Reembolsar',
    cell: (props) => <DeleteTicketModal ticket={props.row.original.ticket} />,
  }),
];

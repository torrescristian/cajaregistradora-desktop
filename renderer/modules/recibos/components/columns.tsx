import { TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';
import { formatPrice } from '@/modules/common/libs/utils';
import { IColumnTicket } from '../interfaces/IColumnTicket';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteTicketModal } from './DeleteTicketModal';
import { MoreInfoModal } from './MoreInfoModal';
import PrintInvoiceButton from './PrintInvoiceButton';

export function statusTranslate(ticketStatus: TICKET_STATUS) {
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

const columnHelper = createColumnHelper<IColumnTicket>();

export const columnsDef = [
  {
    accessorFn: (col: IColumnTicket) => col.ticket.order.id,
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
    accessorFn: (col: IColumnTicket) => col.client || '-',
    header: 'Cliente',
  },
  {
    accessorFn: (col: IColumnTicket) => customPriceFormat(col.totalPrice),
    header: 'Total',
  },
  {
    accessorFn: (col: IColumnTicket) => col.paymentType,
    header: 'Método de pago',
  },
  columnHelper.display({
    header: 'Detalles',
    cell: (props) => <MoreInfoModal ticket={props.row.original.ticket} />,
  }),
  columnHelper.display({
    header: 'Reimprimir',
    cell: (props) => (
      <PrintInvoiceButton
        ticketId={props.row.original.ticket.id!}
        orderId={props.row.original.ticket.order.id!}
      />
    ),
  }),
  columnHelper.display({
    header: 'Reembolsar',
    cell: (props) => <DeleteTicketModal ticket={props.row.original.ticket} />,
  }),
];

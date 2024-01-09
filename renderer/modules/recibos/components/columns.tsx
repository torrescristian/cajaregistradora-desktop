import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

import { TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';
import { formatPrice } from '@/modules/common/libs/utils';

import { IColumnTicket } from '../interfaces/IColumnTicket';
import { createColumnHelper } from '@tanstack/react-table';
import { DeleteTicketModal } from './DeleteTicketModal';
import { MoreInfoModal } from './MoreInfoModal';
import PrintInvoiceButton from './PrintInvoiceButton';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { ProductList } from './ProductList';

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
    accessorFn: (col: IColumnTicket) => `#${col.ticket.order.id}`,
    header: 'Recibo',
  },

  columnHelper.display({
    header: 'Caja',
    cell: (col) =>
      col.row.original.ticket.cashBalance?.id ? (
        `#${col.row.original.ticket.cashBalance?.id}`
      ) : (
        <span className="badge-error badge badge-lg">Error</span>
      ),
  }),
  {
    accessorKey: 'date',
    header: 'Fecha',
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
    header: 'Productos',
    cell: (props) => (
      <ProductList
        items={props.row.original.ticket.order.items}
        promos={props.row.original.ticket.order.promoItems}
      />
    ),
  }),
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

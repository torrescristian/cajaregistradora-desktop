import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import { createColumnHelper } from '@tanstack/react-table';
import { CancelTicketPending } from './CancelTicketPending';
import { formatPrice } from '@/modules/common/libs/utils';
import { statusTranslate } from '@/modules/recibos/components/columns';

const columnHelper = createColumnHelper<ITicket>();

export const columnDefTickPend = [
  {
    accessorFn: (row: ITicket) => row.id,
    header: 'Nro de ticket',
  },
  {
    accessorFn: (row: ITicket) => formatPrice(row.totalPrice),
    header: 'Total',
  },
  {
    accessorFn: (row: ITicket) => statusTranslate(row.status),
    header: 'Estado',
  },
  columnHelper.display({
    cell: (info) => (
      <CancelTicketPending
        key={info.row.original.id}
        ticket={info.row.original}
      />
    ),
    header: 'Procesar',
  }),
];

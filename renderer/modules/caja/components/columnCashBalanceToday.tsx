import { formatPrice } from '@/modules/common/libs/utils';
import { ICashBalance } from '../interfaces/ICashBalance';
import { format } from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';
import ReprintTicketModal from './ReprintTicketModal';

const columnsHelper = createColumnHelper<ICashBalance>();

export const columnDefCashBalanceToday = [
  {
    accessorFn: (row: ICashBalance) => row.id!,
    header: 'Nro de Caja',
  },
  {
    accessorFn: (row: ICashBalance) => row.seller?.username || 'ERROR',
    header: '👤 Vendedor',
  },
  {
    accessorFn: (row: ICashBalance) => formatPrice(row.totalAmount || 0),
    header: '💸 Efectivo total',
  },
  {
    accessorFn: (row: ICashBalance) => formatPrice(row.initialCashAmount),
    header: '💰 Caja inicial',
  },
  {
    accessorFn: (row: ICashBalance) =>
    row.completedAt ? format(new Date(row.completedAt), 'dd/MM/yyyy HH:mm') : 'Activo',
    header: '📅 Cierre de caja',
  },
  columnsHelper.display({
    header: '🎫 Imprimir Ticket',
    cell: (info) => <ReprintTicketModal cashBalance={info.row.original} />,
  }),
];

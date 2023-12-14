import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import { createColumnHelper } from '@tanstack/react-table';
import { CancelTicketPending } from './CancelTicketPending';
import { formatPrice } from '@/modules/common/libs/utils';
import { statusTranslate } from '@/modules/recibos/components/columns';
import { IExpense } from '../interfaces/IExpense';
import { statusTranslateExpenses } from './ColumnsExpenses';
import CancelExpensePending from './CancelExpensePending';

const columnHelper = createColumnHelper<IExpense>();

export const columnDefExpPend = [
  {
    accessorFn: (row: IExpense) => row.id,
    header: 'Nro de Expensa',
  },
  {
    accessorFn: (row: IExpense) => formatPrice(row.amount),
    header: 'Total',
  },
  {
    accessorFn: (row: IExpense) => statusTranslateExpenses(row.status),
    header: 'Estado',
  },
  {
    accessorFn: (row: IExpense) => row.reason,
    header: 'Motivo',
  },
  {
    accessorFn: (row: IExpense) => row.type.name,
    header: 'Categoria',
  },
  columnHelper.display({
    cell: (info) => <CancelExpensePending expense={info.row.original} />,
    id: 'Aprobar expensa',
  }),
];

import { createColumnHelper } from '@tanstack/react-table';
import { formatPrice } from '@/modules/common/libs/utils';
import { IExpense } from '../interfaces/IExpense';
import { statusTranslateExpenses } from './ColumnsExpenses';
import CancelExpensePending from './CancelExpensePending';
import AprovExpenseModal from './AprovExpenseModal';

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
    cell: (info) => (
      <div className="flex flex-row w-full gap-4">
        <AprovExpenseModal expense={info.row.original} />
        <CancelExpensePending expense={info.row.original} />
      </div>
    ),
    header: 'Opciones',
  }),
];

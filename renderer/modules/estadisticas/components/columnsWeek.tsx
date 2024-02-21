import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const columnHelper = createColumnHelper<ICashBalanceExpanded>();

export const columnsWeekDef = [
  {
    header: 'Fecha de creación',
    accessorKey: 'createdAt',
    cell: (info: any) =>
      format(new Date(info.getValue()), 'E dd/LL/yy HH:mm', { locale: es }),
  },
  {
    header: 'Caja Inicial',
    accessorKey: 'initialCashAmount',
  },
  {
    header: 'Caja Efectivo',
    accessorKey: 'newCashAmount',
  },
  {
    header: 'Caja Digital',
    accessorKey: 'digitalCashAmount',
  },
  {
    header: 'Gastos Totales',
    accessorKey: 'totalExpense',
  },
  {
    header: 'Caja Total',
    accessorKey: 'totalAmount',
  },
  // columnHelper.display({
  //   cell: ({ row }) => <button>Borrar</button>,
  //   header: 'Eliminar',
  // }),
];

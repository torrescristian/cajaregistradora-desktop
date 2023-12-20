import { createColumnHelper } from '@tanstack/table-core';
import { IExpense, STATUS_EXPENSE } from '../interfaces/IExpense';
import { format } from 'date-fns';
import { formatPrice } from '@/modules/common/libs/utils';

export function statusTranslateExpenses(expenseStatus: STATUS_EXPENSE) {
  switch (expenseStatus) {
    case STATUS_EXPENSE.APPROVED:
      return 'Aprobado';
    case STATUS_EXPENSE.REJECTED:
      return 'Reembolsado';
    case STATUS_EXPENSE.PENDING:
      return 'Pendiente';
    default:
      return '';
  }
}

const columnHelper = createColumnHelper<IExpense>();

export const columnsDefCashExp = [
  {
    accessorFn: (row: IExpense) => row.id,
    header: 'Referencia de pago',
  },
  {
    accessorFn: (row: IExpense) =>
      format(new Date(row.createdAt!), 'dd/mm/yyyy HH:mm'),
    header: 'Fecha',
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
  },
  {
    accessorFn: (row: IExpense) => row.type.name!,
    header: 'Tipo',
  },
  {
    accessorFn: (row: IExpense) => statusTranslateExpenses(row.status),
    header: 'Estado',
  },
  {
    accessorFn: (row: IExpense) => formatPrice(row.amount),
    header: 'Monto',
  },
];

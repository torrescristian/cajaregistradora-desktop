import { createColumnHelper } from '@tanstack/table-core';
import { IExpense } from '../interfaces/IExpense';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<IExpense>();

export const columnsDefExp = [
  {
    accessorFn: (row: IExpense) => row.id,
    header: 'Referencia de pago',
  },
  {
    accessorFn: (row: IExpense) =>
      format(new Date(row.createdAt), 'dd/mm/yyyy HH:mm'),
    header: 'Fecha',
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
  },
  {
    accessorKey: 'amount',
    header: 'Monto',
  },
];

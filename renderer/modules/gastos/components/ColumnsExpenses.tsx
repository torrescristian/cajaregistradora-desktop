import { createColumnHelper } from '@tanstack/table-core';

import { format } from 'date-fns';
import { formatPrice } from '@/modules/common/libs/utils';
import { IExpense } from '@/modules/caja/interfaces/IExpense';
import { TrashIcon } from '@heroicons/react/24/solid';
import ButtonCancelExpense from './ButtonCancelExpense';

const columnHelper = createColumnHelper<IExpense>();

export const columnsDefExp = [
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
    accessorFn: (row: IExpense) => formatPrice(row.amount),
    header: 'Monto',
  },
  columnHelper.display({
    header: 'Eliminar',
    cell: (info) => <ButtonCancelExpense expense={info.row.original} />,
  }),
];

import { createColumnHelper } from '@tanstack/table-core';

import { format } from 'date-fns';
import { formatPrice } from '@/modules/common/libs/utils';
import { IExpense } from '@/modules/caja/interfaces/IExpense';
import { TrashIcon } from '@heroicons/react/24/solid';
import ButtonCancelExpense from '../molecules/ButtonCancelExpense';

const columnHelper = createColumnHelper<IExpense>();

export const columnsDefExp = [
  {
    accessorFn: (row: IExpense) =>
      format(new Date(row.createdAt!), 'dd/mm/yyyy HH:mm'),
    header: 'Fecha',
  },
  {
    accessorFn: (row: IExpense) => formatPrice(row.amount),
    header: 'Monto',
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
  },
  columnHelper.display({
    header: 'Eliminar',
    cell: (info) => <ButtonCancelExpense expense={info.row.original} />,
  }),
];

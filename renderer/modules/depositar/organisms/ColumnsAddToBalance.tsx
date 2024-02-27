import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import { formatPrice } from '@/modules/common/libs/utils';
import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import { TrashIcon } from '@heroicons/react/24/solid';
import ButtonCancelAddToBalance from '../moleculas/ButtonCancelAddToBalance';

const columnHelper = createColumnHelper<INewAddBalance>();

export const columnsDefExp = [
  {
    accessorFn: (row: INewAddBalance) =>
      row.createdAt && format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm'),
    header: 'Fecha',
  },
  {
    accessorFn: (row: INewAddBalance) => formatPrice(row.amount),
    header: 'Monto',
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
  },
  columnHelper.display({
    header: 'Eliminar',
    cell: (info) => (
      <ButtonCancelAddToBalance newAddBalance={info.row.original} />
    ),
  }),
];

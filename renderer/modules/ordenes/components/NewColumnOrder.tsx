import { createColumnHelper } from '@tanstack/react-table';
import { ITable } from '../interfaces/ITable';
import { info } from 'console';
import { ButtonAdd } from './ButtonAdd';

const columnHelper = createColumnHelper<ITable>();

export const newColumnDefOrder = [
  {
    accessorFn: (row: ITable) => row.id,
    header: 'Mesas',
  },
  columnHelper.display({
    header: 'Mesas',
    cell: (info) => (
      <div className="w-full">
        <div className="w-full flex flex-row gap-2">
          <ButtonAdd />
        </div>
      </div>
    ),
  }),
  {
    accessorFn: (row: ITable) => row.id,
    header: 'Deliveries',
  },
  {
    accessorFn: (row: ITable) => row.id,
    header: 'Pedidos a retirar',
  },
];

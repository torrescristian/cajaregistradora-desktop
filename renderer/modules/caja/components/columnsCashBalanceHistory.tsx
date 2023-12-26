import { createColumnHelper } from '@tanstack/react-table';
import { ICashBalanceExpanded } from '../interfaces/ICashBalance';
import {
  getLabelByPaymentsType,
  getPaymentsType,
} from '@/modules/common/libs/utils';

const columnHelper = createColumnHelper<ICashBalanceExpanded>();

export const columnDefCashBalance = [
  {
    accessorFn: (row: ICashBalanceExpanded) =>
      row.tickets.map((t) => t.order.totalPrice),
    header: 'Productos',
  },
  /*   {
    accessorFn : (row : ICashBalanceExpanded) => 
    row.tickets.map((t) => getPaymentsType(t.payments)),
    header: 'Variantes',
  } */
];

import { ICashBalanceExpanded } from '../interfaces/ICashBalance';

export const columnDefCashBalance = [
  {
    accessorFn: (row: ICashBalanceExpanded) =>
      row.tickets.map((t) => t.order.totalPrice),
    header: 'Productos',
  },
];

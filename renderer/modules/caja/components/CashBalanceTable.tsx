import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ICashBalanceExpanded } from '../interfaces/ICashBalance';
import { columnDefCashBalance } from './columnsCashBalanceHistory';

interface IProps {
  cashBalance: ICashBalanceExpanded[];
}

export default function CashBalanceTable({ cashBalance }: IProps) {
  const tableInstanceCashBalance = useReactTable({
    columns: columnDefCashBalance,
    data: cashBalance,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="table table-zebra-zebra w-full">
      <thead>
        {tableInstanceCashBalance.getHeaderGroups().map(({ id, headers }) => (
          <tr key={id}>
            {headers.map(({ id: headerId, column, getContext }) => (
              <th key={headerId}>
                {flexRender(column.columnDef.header, getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstanceCashBalance.getRowModel().rows.map((rowEl) => {
          return (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => {
                return (
                  <td key={cellEl.id}>
                    {flexRender(
                      cellEl.column.columnDef.cell,
                      cellEl.getContext(),
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

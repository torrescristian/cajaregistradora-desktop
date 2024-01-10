import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ICashBalance } from '../interfaces/ICashBalance';
import { columnDefCashBalanceToday } from './columnCashBalanceToday';

interface IProps {
  cashBalance: ICashBalance[];
}

export default function TodayCashBalancesTabl({ cashBalance }: IProps) {
  const tableInstanceCashBalance = useReactTable({
    columns: columnDefCashBalanceToday,
    data: cashBalance,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table table-zebra-zebra">
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

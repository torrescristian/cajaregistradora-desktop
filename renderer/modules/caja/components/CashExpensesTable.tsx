import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IExpense } from '../interfaces/IExpense';
import { columnsDefCashExp } from './ColumnsExpenses';

interface IProps {
  data: IExpense[];
}

export default function CashExpensesTable({ data }: IProps) {
  const tableInstanceExpenses = useReactTable({
    columns: columnsDefCashExp,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table table-zebra-zebra">
      <thead>
        {tableInstanceExpenses.getHeaderGroups().map(({ id, headers }) => (
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
        {tableInstanceExpenses.getRowModel().rows.map((rowEl) => {
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

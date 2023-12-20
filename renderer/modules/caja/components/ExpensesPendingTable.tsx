import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IExpense } from '../interfaces/IExpense';
import { columnDefExpPend } from './columnsExpensePending';

interface IProps {
  data: IExpense[];
}

export default function ExpensesPendingTable({ data }: IProps) {
  const tableInstanceExpenses = useReactTable({
    columns: columnDefExpPend,
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

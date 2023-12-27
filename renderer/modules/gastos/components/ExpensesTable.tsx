import { IExpense } from '@/modules/caja/interfaces/IExpense';
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnsDefExp } from './ColumnsExpenses';
import { useState } from 'react';

interface IProps {
  data: IExpense[];
}

export default function ExpensesTable({ data }: IProps) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const tableInstanceExpenses = useReactTable({
    columns: columnsDefExp,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <table className="table table-zebra-zebra">
        <thead>
          {tableInstanceExpenses.getHeaderGroups().map(({ id, headers }) => (
            <tr key={id}>
              {headers.map(({ id: headersId, column, getContext }) => (
                <th key={headersId} onClick={column.getToggleSortingHandler()}>
                  {flexRender(column.columnDef.header, getContext())}
                  {{
                    asc: ' ↑',
                    desc: ' ↓',
                  }[column.getIsSorted() as string] || ''}
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
    </section>
  );
}

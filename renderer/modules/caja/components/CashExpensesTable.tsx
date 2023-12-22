import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IExpense } from '../interfaces/IExpense';
import { columnsDefCashExp } from './ColumnsExpenses';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { longRange } from '@/modules/common/libs/utils';

interface IProps {
  data: IExpense[];
}

export default function CashExpensesTable({ data }: IProps) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const tableInstanceExpenses = useReactTable({
    columns: columnsDefCashExp,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <section>
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
    </section>
  );
}

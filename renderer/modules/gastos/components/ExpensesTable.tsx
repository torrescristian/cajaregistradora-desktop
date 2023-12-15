import { IExpense } from '@/modules/caja/interfaces/IExpense';
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnsDefExp } from './ColumnsExpenses';
import { longRange, range } from '@/modules/common/libs/utils';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface IProps {
  data: IExpense[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  totalPages: number;
}

export default function ExpensesTable({
  data,
  totalPages,
  onNextPage,
  onPreviousPage,
  page,
}: IProps) {
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

  const totalPagesRange = longRange(1, totalPages);

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
      <div className="flex flex-row w-full items-center  justify-center gap-5">
        <button className="btn btn-secondary" onClick={onPreviousPage}>
          Anterior
        </button>
        {totalPagesRange.map((pageNumber) => (
          <button
            className={twMerge(
              pageNumber === page ? 'btn-disabled' : null,
              'join-item btn',
            )}
          >
            {pageNumber}
          </button>
        ))}
        <button className="btn btn-secondary" onClick={onNextPage}>
          Siguiente
        </button>
      </div>
    </section>
  );
}

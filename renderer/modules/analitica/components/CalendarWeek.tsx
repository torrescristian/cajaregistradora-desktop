import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnsWeekDef } from './columnsWeek';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { longRange } from '@/modules/common/libs/utils';
import Calendar from 'react-calendar';
import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';

interface IProps {
  cashBalances: ICashBalanceExpanded[];
  filtering?: string;
  setFiltering?: (value: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  totalPages: number;
  handleSelectRange: (
    value: any,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined;
}

export const CalendarWeek = ({
  cashBalances,
  filtering,
  setFiltering,
  onNextPage,
  onPreviousPage,
  page,
  totalPages,
  handleSelectRange,
}: IProps) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const tableInstance = useReactTable({
    columns: columnsWeekDef,
    data: cashBalances,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const totalPagesRange = longRange(1, totalPages);

  return (
    <section className="w-full flex flex-row ">
      <div className="w-full flex flex-col gap-5 p-3">
        <table className="table table-zebra-zebra w-full">
          <thead>
            {tableInstance.getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map(({ id: headersId, column, getContext }) => (
                  <th
                    key={headersId}
                    onClick={column.getToggleSortingHandler()}
                  >
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
            {tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <tr key={rowEl.id}>
                  {rowEl.getVisibleCells().map((cellEl) => {
                    return (
                      <td
                        key={cellEl.id}
                        className="whitespace-nowrap text-right"
                      >
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
          <button className="btn btn-primary" onClick={onPreviousPage}>
            Anterior
          </button>
          {totalPagesRange.map((pageNumber) => (
            <button
              key={pageNumber}
              className={twMerge(
                pageNumber === page ? 'btn-disabled' : null,
                'join-item btn',
              )}
            >
              {pageNumber}
            </button>
          ))}
          <button className="btn btn-primary" onClick={onNextPage}>
            Siguiente
          </button>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Calendar
          className="w-[80vw] h-min"
          allowPartialRange
          selectRange
          onChange={handleSelectRange}
          locale='es'
        />
      </div>
    </section>
  );
};

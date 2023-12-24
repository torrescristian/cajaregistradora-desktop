import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnSort,
} from '@tanstack/react-table';
import { columnsDef } from './columns';
import { twMerge } from 'tailwind-merge';
import { longRange } from '@/modules/common/libs/utils';
import { useState } from 'react';
import { ButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';

interface IProps {
  data: any[];
}

export default function TicketTable({ data }: IProps) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const tableInstance = useReactTable({
    columns: columnsDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <section>
      <table className="table table-zebra">
        <thead>
          {tableInstance.getHeaderGroups().map(({ id, headers }) => (
            <tr key={id}>
              {headers.map(({ id: headerId, column, getContext }) => (
                <th key={headerId}>
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

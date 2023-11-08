import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import { columnsDef } from './columns';
import { useState } from 'react';

interface IProps {
  data: any[];
}

export default function TicketTable({ data }: IProps) {
  
  
  const tableInstance = useReactTable({
    columns: columnsDef,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table table-zebra">
      <thead>
        {tableInstance.getHeaderGroups().map(({ id, headers }) => (
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
  );
}

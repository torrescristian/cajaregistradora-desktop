import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnDefTickPend } from './columnsTicketsPending';

interface IProps {
  tickets: ITicket[];
}

export default function TicketPendingTable({ tickets }: IProps) {
  const tableInstanse = useReactTable({
    columns: columnDefTickPend,
    data: tickets,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col p-5">
      <table className="table w-full table-zebra">
        <thead>
          {tableInstanse.getHeaderGroups().map(({ id, headers }) => (
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
          {tableInstanse.getRowModel().rows.map((rowEl) => {
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
    </div>
  );
}

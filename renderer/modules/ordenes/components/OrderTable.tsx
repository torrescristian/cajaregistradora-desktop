import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IOrder } from '../interfaces/IOrder';
import { columnDefOrder } from './columnOrder';

interface IProps {
  orders: IOrder[];
}

export default function OrderTable({ orders }: IProps) {
  const tableInstanceOrder = useReactTable({
    columns: columnDefOrder,
    data: orders,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="table table-zebra-zebra">
        <thead>
          {tableInstanceOrder.getHeaderGroups().map(({ id, headers }) => (
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
          {tableInstanceOrder.getRowModel().rows.map((rowEl) => {
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

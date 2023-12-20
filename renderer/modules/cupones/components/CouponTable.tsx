import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ICoupon } from '../interfaces/ICoupon';
import { columnDefCoupon } from './ColumnCoupon';

interface IProps {
  coupon: ICoupon[];
}

export default function CouponTable({ coupon }: IProps) {
  const tableInstance = useReactTable({
    columns: columnDefCoupon,
    data: coupon,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="table table-zebra-zebra">
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

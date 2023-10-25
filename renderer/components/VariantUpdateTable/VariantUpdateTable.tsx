import { IProduct } from '@/interfaces/IProduct';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnDefProduct } from './subcomponents/columnsProducts';
import { IVariantExpanded } from '@/interfaces/IVariants';
import { useMemo, useState } from 'react';

interface IProps {
  products: IProduct[];
}

function VariantUpdateTable({ products }: IProps) {
  if (!products.length) return null;

  const variants = useMemo(
    () =>
      products.flatMap((p) =>
        p.variants.map((v) => ({ ...v, product: p }) as IVariantExpanded),
      ),
    [products],
  );
  const [data, setData] = useState([...variants]);

  const tableInstance = useReactTable({
    columns: columnDefProduct,
    data: variants,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
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
export default VariantUpdateTable;

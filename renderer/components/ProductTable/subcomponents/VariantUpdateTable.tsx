import { IProduct, IProductPage } from '@/interfaces/IProduct';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnDefProduct } from './columnsProducts';
import { IVariantExpanded } from '@/interfaces/IVariants';

interface IProps {
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
  setActivePage: (page: number) => void;
  pagination: IProductPage['pagination'];
}

function VariantUpdateTable({
  products,
  isLoading,
  isError,
  pagination,
  setActivePage,
}: IProps) {
  const variants = products.flatMap((p) =>
    p.variants.map((v) => ({ ...v, product: p }) as IVariantExpanded),
  );
  const tableInstance = useReactTable({
    columns: columnDefProduct,
    data: variants,
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
export default VariantUpdateTable;

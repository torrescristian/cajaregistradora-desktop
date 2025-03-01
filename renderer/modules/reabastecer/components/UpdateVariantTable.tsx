import { flexRender } from '@tanstack/react-table';
import { useVariantUpdateTableProps } from '@/modules/reabastecer/hooks/useVariantUpdateTableProps';

interface IProps {
  tableInstance?: ReturnType<typeof useVariantUpdateTableProps>;
}

function UpdateVariantTable({ tableInstance }: IProps) {
  if (!tableInstance) return null;

  return (
    <div className="w-full flex flex-col items-center gap-10 ">
      <table className="table table-zebra">
        <thead>
          {tableInstance!.getHeaderGroups().map(({ id, headers }) => (
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
          {tableInstance!.getRowModel().rows.map((rowEl) => {
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
export default UpdateVariantTable;

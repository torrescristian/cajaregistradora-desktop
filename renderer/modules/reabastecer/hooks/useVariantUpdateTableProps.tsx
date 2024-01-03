import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import {
  ColumnSort,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { columnDefProduct } from '@/modules/reabastecer/components/columnsProducts';

export const useVariantUpdateTableProps = (variants: IVariantExpanded[]) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [data, setData] = useState(variants);

  useEffect(() => {
    setData(variants);
  }, [variants]);

  const [rowSelected, setRowSelected] = useState({});

  const tableInstance = useReactTable({
    columns: columnDefProduct,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    state: {
      rowSelection: rowSelected,
      sorting,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelected,
    enableRowSelection: true,
  });

  return tableInstance;
};

import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { columnDefProduct } from '@/modules/reabastecer/components/columnsProducts';
import { IProduct } from '@/modules/products/interfaces/IProduct';

interface IProps {
  products?: IProduct[];
}

export const useVariantUpdateTableProps = ({ products }: IProps) => {
  const variants = useMemo(() => {
    if (!products?.length) return [];
    return products?.flatMap(
      (p) => p.variants?.map((v) => ({ ...v, product: p }) as IVariantExpanded),
    );
  }, [products, products?.length]);
  const [data, setData] = useState([...variants]);

  const [rowSelected, setRowSelected] = useState({});

  const tableInstance = useReactTable({
    columns: columnDefProduct,
    data: variants,
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
    },
    onRowSelectionChange: setRowSelected,
    enableRowSelection: true,
  });

  return tableInstance;
};

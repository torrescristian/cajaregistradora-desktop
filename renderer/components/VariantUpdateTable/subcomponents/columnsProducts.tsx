import { IVariantExpanded } from '@/interfaces/IVariants';
import { createColumnHelper } from '@tanstack/react-table';
import { ProductModal } from './ProductModal';
import { StockColumn } from './StockColumn';
import { PriceColumn } from './PriceColumn';
import { ProductTypeMenu } from './ProductTypeMenu';

const columnHelper = createColumnHelper<IVariantExpanded>();

export const columnDefProduct = [
  {
    accessorFn: (col: IVariantExpanded) => col.product.name,
    header: 'Producto',
  },
  {
    accessorFn: (col: IVariantExpanded) => col.name,
    header: 'Variante',
  },
  {
    accessorFn: (col: IVariantExpanded) => col.price,
    header: 'Precio',
    cell: PriceColumn,
  },
  {
    accessorFn: (col: IVariantExpanded) =>
      col.product.isService ? '-' : col.stock_per_variant?.stock,
    header: 'Stock',
    cell: StockColumn,
  },

  columnHelper.display({
    header: 'Tipo',
    cell: (props) => <ProductTypeMenu product={props.row.original.product} />,
  }),
  columnHelper.display({
    header: 'Ver detalles',
    cell: (props) => (
      <ProductModal
        product={props.row.original.product}
        variant={props.row.original}
      />
    ),
  }),
];

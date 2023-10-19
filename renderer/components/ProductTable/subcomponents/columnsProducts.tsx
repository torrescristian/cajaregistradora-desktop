import { IVariantExpanded } from '@/interfaces/IVariants';
import { formatPrice } from '@/libs/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { ProductModal } from './ProductModal';

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
    accessorFn: (col: IVariantExpanded) => formatPrice(col.price),
    header: 'Precio',
  },
  columnHelper.display({
    header: 'Ver detalles',
    cell: (props) => <ProductModal product={props.row.original.product} />,
  }),
];

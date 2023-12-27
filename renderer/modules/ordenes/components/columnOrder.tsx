import { createColumnHelper } from '@tanstack/react-table';
import { IOrder } from '../interfaces/IOrder';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ProductList } from '@/modules/recibos/components/ProductList';
import { formatPrice } from '@/modules/common/libs/utils';
import { getTranslateOrderStatus } from '../utils/utils';
import ClientList from './ClientList';
import { CancelOrderModal } from './CancelOrderModal';
import { EditOrderModal } from './EditOrderModal';
import { ConfirmOrderModal } from './ConfirmOrderModal';

const columnHelper = createColumnHelper<IOrder>();

export const columnDefOrder = [
  {
    accessorFn: (row: IOrder) => row.id,
    header: 'Nro de Orden',
  },
  columnHelper.display({
    cell: (info) => <ClientList client={info.row.original.client!} />,
    header: 'Cliente',
  }),
  {
    accessorFn: (row: IOrder) =>
      format(new Date(row.updatedAt!), 'dd MMMM yyyy HH:mm', { locale: es }),
    header: 'Fecha',
  },
  columnHelper.display({
    header: 'Productos',
    cell: (info) => (
      <ProductList
        items={info.row.original.items}
        promos={info.row.original.promoItems.map((p) => p.promo)}
      />
    ),
  }),
  {
    accessorFn: (row: IOrder) => formatPrice(row.totalPrice),
    header: 'Total',
  },
  {
    accessorFn: (row: IOrder) => getTranslateOrderStatus(row.status),
    header: 'Estado',
  },
  columnHelper.display({
    header: 'Acciones',
    cell: (info) => (
      <div className="w-full">
        <ConfirmOrderModal order={info.row.original} />
        <div className="w-full flex flex-row justify-between gap-5">
          <EditOrderModal order={info.row.original} />
          <CancelOrderModal order={info.row.original} />
        </div>
      </div>
    ),
  }),
];

import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { ICoupon } from '../interfaces/ICoupon';
import { format } from 'date-fns';
import { createColumnHelper } from '@tanstack/table-core';
import CancelCouponButton from './CancelCouponButton';

const columnHelper = createColumnHelper<ICoupon>();

export const columnDefCoupon = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'code',
    header: 'Codigo',
  },
  {
    accessorFn: (row: ICoupon) =>
      format(new Date(row.dueDate!), 'dd/mm/yyyy HH:mm'),
    header: 'Fecha vencimiento',
  },
  {
    accessorFn: (row: ICoupon) =>
      row.discount.type === DISCOUNT_TYPE.FIXED ? 'Fijo' : 'Porcentaje',
    header: 'Tipo',
  },
  {
    accessorFn: (row: ICoupon) => row.discount.amount,
    header: 'Monto',
  },
  {
    accessorKey: 'maxAmount',
    header: 'Monto maximo',
  },
  {
    accessorFn: (row: ICoupon) =>
      row.variant
        ? `${row.variant?.product.type.emoji} ${row.variant?.product.name} ${row.variant?.name}`
        : ' ',
    header: 'Producto seleccionado',
  },

  columnHelper.display({
    header: 'Eliminar',
    cell: (props) => <CancelCouponButton couponId={props.row.original.id!} />,
  }),
];

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IOrder } from '../interfaces/IOrder';
import { columnDefOrder } from './columnOrder';
import FormRow from './FormRow';
import { useStore } from 'zustand';
import {
  getInitCart,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import {
  adaptCartItemToOrderItem,
  adaptOrderItemToCartItem,
} from '../utils/utils';

interface IProps {
  orders: IOrder[];
  setOrderToUpdate: (order: IOrder) => void;
}

export default function OrderTable({ orders, setOrderToUpdate }: IProps) {
  const tableInstanceOrder = useReactTable({
    columns: columnDefOrder,
    data: orders,
    getCoreRowModel: getCoreRowModel(),
  });

  const initCart = useCartStore(getInitCart);

  const handleSubmitEditOrder = (order: IOrder) => {
    setOrderToUpdate(order);
    initCart({
      additionalDetails: order.additionalDetails,
      subtotalPrice: order.subtotalPrice,
      totalPrice: order.totalPrice,
      cartItems: order.items.map(adaptOrderItemToCartItem),
      promoItems: order.promoItems,
      discountAmount: order.discount?.amount,
      discountType: order.discount?.type,
    });
  };

  return (
    <div>
      <table className="table table-zebra-zebra">
        <thead>
          {tableInstanceOrder.getHeaderGroups().map(({ id, headers }) => (
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
          {tableInstanceOrder.getRowModel().rows.map((rowEl) => {
            return (
              <FormRow
                onSubmit={handleSubmitEditOrder}
                order={rowEl.original}
                key={rowEl.id}
              >
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
              </FormRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

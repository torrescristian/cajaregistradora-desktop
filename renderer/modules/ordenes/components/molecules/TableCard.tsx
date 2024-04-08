import { twMerge } from 'tailwind-merge';

import { formatPrice, suggestTextColor } from '@/modules/common/libs/utils';

import { ITable } from '../../interfaces/ITable';
import EditButton from '../atoms/EditButton';
import {
  getCreateTable,
  getUpdateTable,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { ButtonAdd } from '../atoms/ButtonAdd';
import {
  getSetCartFromOrder,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import CheckButton from '../atoms/CheckButton';
import { CheckIcon, PencilIcon } from '@heroicons/react/24/solid';
import { ConfirmOrderModal } from '../organisms/ConfirmOrderModal';

interface IProps {
  table: ITable;
}

export function TableCard({ table }: IProps) {
  const createTable = useOrderStore(getCreateTable);
  const updateTable = useOrderStore(getUpdateTable);
  const setCartFromOrder = useCartStore(getSetCartFromOrder);
  const order = {
    ...table.order,
    table: table,
  };

  const handleClickAdd = () => {
    createTable(order);
  };

  const handleClickEdit = () => {
    setCartFromOrder(order);
    updateTable(order);
  };

  return (
    <div
      className={twMerge('rounded-lg p-4 w-full flex flex-col gap-4 border')}
    >
      <h3 className="text-lg font-semibold">Mesa: {table.code}</h3>
      <div className="flex flex-col gap-2 items-center">
        {table.order ? (
          <>
            <p className="text-sm">{formatPrice(table.order?.totalPrice)}</p>
            <div className="flex gap-2">
              <ConfirmOrderModal order={order} fill />{' '}
              <button className="btn btn-square" onClick={handleClickEdit}>
                <PencilIcon className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <ButtonAdd
            className="border border-neutral text-black"
            onClick={handleClickAdd}
          />
        )}
      </div>
    </div>
  );
}

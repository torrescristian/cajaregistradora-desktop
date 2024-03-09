import { PencilIcon } from '@heroicons/react/24/solid';
import React from 'react';

import {
  getUpdateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { IOrder } from '../../interfaces/IOrder';
import {
  getSetCartFromOrder,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';

interface IProps {
  order: IOrder;
}

export const EditOrderModal = ({ order }: IProps) => {
  //Añade el producto pero no lo actualiza
  const updateTakeAway = useOrderStore(getUpdateTakeAway);
  const setCartFromOrder = useCartStore(getSetCartFromOrder);

  const handleClick = () => {
    setCartFromOrder(order);
    updateTakeAway(order);
  };

  return (
    <button className="btn btn-outline text-base-content" onClick={handleClick}>
      <PencilIcon className="w-5 h-5 " />
    </button>
  );
};

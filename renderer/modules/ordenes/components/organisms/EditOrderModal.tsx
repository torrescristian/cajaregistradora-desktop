import React from 'react';

import {
  getUpdateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import {
  getSetCartFromOrder,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';

import { IOrder } from '../../interfaces/IOrder';
import EditButton from '../atoms/EditButton';

interface IProps {
  order: IOrder;
}

export const EditOrderModal = ({ order }: IProps) => {
  const updateTakeAway = useOrderStore(getUpdateTakeAway);
  const setCartFromOrder = useCartStore(getSetCartFromOrder);

  const handleClick = () => {
    setCartFromOrder(order);
    updateTakeAway(order);
  };

  return <EditButton onClick={handleClick} />;
};

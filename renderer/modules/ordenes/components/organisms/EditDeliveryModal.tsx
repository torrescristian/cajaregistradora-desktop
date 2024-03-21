import React from 'react';

import {
  getUpdateDelivery,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import {
  getSetCartFromOrder,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';

import { IOrder } from '../../interfaces/IOrder';
import EditButton from '../molecules/EditButton';

interface IProps {
  order: IOrder;
}

export const EditDeliveryModal = ({ order }: IProps) => {
  const updateDelivery = useOrderStore(getUpdateDelivery);
  const setCartFromOrder = useCartStore(getSetCartFromOrder);

  const handleClick = () => {
    setCartFromOrder(order);
    updateDelivery(order);
  };

  return <EditButton onClick={handleClick} />;
};

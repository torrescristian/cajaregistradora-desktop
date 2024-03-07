import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import {
  getUpdateTakeAway,
  getIsUpdateTakeAway,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';

export const EditOrderModal = () => {
  //Añade el producto pero no lo actualiza
  const updateTakeAway = useOrderStore(getUpdateTakeAway);
  const { handleToggleEdit } = useContext(OrderContext);
  return (
    <button
      className="btn btn-outline text-base-content"
      onClick={updateTakeAway}
    >
      <PencilIcon className="w-5 h-5 " />
    </button>
  );
};

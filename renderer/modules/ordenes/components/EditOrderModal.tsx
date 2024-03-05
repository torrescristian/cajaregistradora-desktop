import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

export const EditOrderModal = () => {
  const { handleToggleEdit } = useContext(OrderContext);
  return (
    <button
      className="btn btn-outline text-base-content"
      onClick={handleToggleEdit}
    >
      <PencilIcon className="w-5 h-5 " />
    </button>
  );
};

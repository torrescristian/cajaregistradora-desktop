import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

export const EditOrderModal = () => {
  const { handleToggleEdit } = useContext(OrderContext);
  return (
    <div className="w-full flex">
      <button
        className="btn btn-outline text-base-content"
        onClick={handleToggleEdit}
      >
        <PencilIcon className="w-5 h-5 " />
      </button>
    </div>
  );
};

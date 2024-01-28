import { PencilIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import useCreateTicketForm from '../hooks/useCreateTicketForm';
import { IOrder } from '../interfaces/IOrder';

interface IProps {
  order: IOrder;
}

export const EditOrderModal = ({ order }: IProps) => {
  const { handleToggleEdit } = useContext(OrderContext);
  /* const {handleToggleEdit} = useCreateTicketForm({order}) */
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

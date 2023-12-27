import { PencilIcon } from '@heroicons/react/24/solid';
import useCreateTicketForm from '../hooks/useCreateTicketForm';
import { IOrder } from '../interfaces/IOrder';
import React, { useContext, useRef } from 'react';
import e from 'express';
import { OrderContext } from '../context/UpdateOrderContext';

interface IProps {
  order: IOrder;
}

export const EditOrderModal = ({ order }: IProps) => {
  const { handleToggleEdit } = useContext(OrderContext);

  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div className="w-full flex">
      <button
        className="btn btn-secondary text-base-content"
        onClick={handleToggleEdit}
      >
        <PencilIcon className="w-5 h-5 " />
      </button>
    </div>
  );
};

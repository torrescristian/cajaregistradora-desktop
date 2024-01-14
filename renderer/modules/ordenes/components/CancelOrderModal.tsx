import { TrashIcon } from '@heroicons/react/24/solid';
import { IOrder } from '../interfaces/IOrder';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { useContext, useRef } from 'react';
import { OrderContext } from '../context/OrderContext';
import useCreateTicketForm from '../hooks/useCreateTicketForm';

interface IProps {
  order: IOrder;
}

export const CancelOrderModal = ({ order }: IProps) => {
  /*  const { handleCancelOrder, cancelOrderMutation } = useContext(OrderContext); */
  const { cancelOrderMutation, handleCancelOrder } = useCreateTicketForm({
    order,
  });

  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };
  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  return (
    <div className="flex flex-col">
      <button
        disabled={cancelOrderMutation.isLoading}
        className="btn btn-min btn-error btn-outline text-base-content"
        onClick={handleOpenModal}
      >
        <TrashIcon className="w-5 h-5 " />
      </button>
      <dialog ref={ref} className="modal-box">
        <p className="text-center whitespace-nowrap text-xl font-bold p-3">
          ¿Esta seguro de eliminar la orden # {order.id!}?
        </p>
        <div className="flex flex-row justify-end w-full gap-5 p-5">
          <ButtonClose label="Cerrar " onClick={handleCloseModal} />
          <button
            className="btn btn-error text-base-content"
            onClick={handleCancelOrder}
          >
            Eliminar orden
          </button>
        </div>
      </dialog>
    </div>
  );
};

import { useContext } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

import { ButtonClose } from '@/modules/common/components/atoms/ButtonClose';
import ModalTemplate from '@/modules/common/components/templates/ModalTemplate';
import {
  getCloseModal,
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';

import { OrderContext } from '../../context/OrderContext';
import { IOrder } from '../../interfaces/IOrder';
import useCancelOrderMutation from '../../hooks/useCancelOrderMutation';
import { toast } from 'react-toastify';

interface IProps {
  order: IOrder;
}

const ConfirmModal = ({ order }: IProps) => {
  const closeModal = useModalStore(getCloseModal);
  const cancelOrderMutation = useCancelOrderMutation();

  const handleCancelOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await cancelOrderMutation.mutateAsync(order);
      closeModal();
      toast.success('Orden cancelada con exito');
    } catch (e) {
      toast.error('No se pudo cancelar la orden');
    }
  };

  return (
    <ModalTemplate>
      <p className="text-center whitespace-nowrap text-xl font-bold p-3">
        ¿Esta seguro de eliminar la orden # {order.id!}?
      </p>
      <div className="flex flex-row justify-end w-full gap-5 p-5">
        <ButtonClose label="Cerrar " onClick={closeModal} />
        <button
          className="btn btn-error text-base-content"
          onClick={handleCancelOrder}
        >
          Eliminar orden
        </button>
      </div>
    </ModalTemplate>
  );
};

export const CancelOrderModal = ({ order }: IProps) => {
  const { cancelOrderMutation } = useContext(OrderContext);
  const openModal = useModalStore(getOpenModal);

  return (
    <button
      disabled={cancelOrderMutation.isLoading}
      className="btn btn-square btn-min btn-error btn-outline text-base-content"
      onClick={() => openModal(<ConfirmModal order={order} />)}
    >
      <TrashIcon className="w-5 h-5 " />
    </button>
  );
};

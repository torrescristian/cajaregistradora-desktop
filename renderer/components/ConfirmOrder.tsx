import { useRef, useState } from 'react';
import ClientForm from './ClientForm';
import {
  getAdditionalDetails,
  getCartItems,
  getClientId,
  getClientName,
  getClientPhone,
  getSubtotalPrice,
  getTotalAmount,
  useCartStore,
} from '@/contexts/CartStore';
import { ICartItem } from '@/interfaces/ICart';
import useCreateOrderMutation from '@/hooks/services/useCreateOrderMutation';
import Loader from './Loader';

export const ConfirmOrder = () => {
  const clientName = useCartStore(getClientName);
  const clientPhone = useCartStore(getClientPhone);
  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalAmount);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems) as ICartItem[];
  const addClientId = useCartStore((state) => state.addClientId);
  const clientId = useCartStore(getClientId);
  const orderMutation = useCreateOrderMutation();

  const ref = useRef<HTMLDialogElement>(null);

  const handleSubmit = () => {
    orderMutation.mutate({
      items,
      clientName,
      clientPhone,
      totalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
    });
  };

  const handleClickConfirmOrder = () => {
    ref.current?.showModal();
  };

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  if (orderMutation.isSuccess) {
    return (
      <div className="p-10 toast toast-top toast-end">
        <div className="alert alert-success">
          <span className="text-stone-50 text-xl">Pedido agregado 🎉</span>
        </div>
      </div>
    );
  }
  return (
    <section>
      <button className="btn btn-primary" onClick={handleClickConfirmOrder}>
        Pasar Orden
      </button>
      <dialog
        ref={ref}
        className="bg-base-300 shadow-md shadow-neutral-content p-10"
      >
        <ClientForm onSelect={(client) => addClientId(client.id!)} />

        <button
          onClick={handleSubmit}
          className="btn sticky top-0 z-20 w-fit whitespace-nowrap bg-green-400 text-xl text-stone-50 hover:bg-green-600"
        >
          Pasar orden
        </button>
      </dialog>
    </section>
  );
};

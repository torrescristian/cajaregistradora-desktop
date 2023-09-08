import { useRef } from 'react';
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
    /* FIXME: Quitar el stock del producto */
    <section>
      <button className="btn btn-primary" onClick={handleClickConfirmOrder}>
        Pasar Orden
      </button>
      <dialog ref={ref} className="border-4 rounded-3xl py-5 px-10">
        <ClientForm onSelect={(client) => addClientId(client?.id || null)} />

        <div className="flex flex-col w-full items-center pt-5">
          <button
            onClick={handleSubmit}
            className="btn sticky top-0 z-20 w-fit whitespace-nowrap bg-green-400 text-xl text-stone-50 hover:bg-green-600"
          >
            Crear orden pendiente
          </button>

          <button
            className="btn btn-link text-stone-50"
            onClick={() => ref.current?.close()}
          >
            Cancelar
          </button>
        </div>
      </dialog>
    </section>
  );
};

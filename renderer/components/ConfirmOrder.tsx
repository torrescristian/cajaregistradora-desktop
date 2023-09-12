import { useRef } from 'react';
import ClientForm from './ClientForm';
import {
  getAdditionalDetails,
  getCartItems,
  getClientId,
  getSubtotalPrice,
  getTotalAmount,
  useCartStore,
} from '@/contexts/CartStore';
import { ICartItem } from '@/interfaces/ICart';
import useCreateOrderMutation from '@/hooks/services/useCreateOrderMutation';
import Loader from './Loader';
import useUpdateOrderMutation from '@/hooks/services/useUpdateOrderMutation';
import { IOrder, IOrderItem } from '@/interfaces/IOrder';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
}

export const ConfirmOrder = ({ updateMode, order, onSubmit }: IProps) => {
  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalAmount);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems) as ICartItem[];
  const addClientId = useCartStore((state) => state.addClientId);
  const clientId = useCartStore(getClientId);

  const orderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation();

  const ref = useRef<HTMLDialogElement>(null);

  const adaptCartItemToOrderItem = (cartItem: ICartItem): IOrderItem => {
    return {
      product: cartItem.product,
      quantity: cartItem.quantity,
      selectedVariant: cartItem.selectedVariant,
      price: cartItem.selectedVariant.price,
    };
  };

  const createOrder = () => {
    orderMutation.mutate({
      items,
      totalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
    });
  };

  const updateOrder = () => {
    updateOrderMutation.mutate({
      order: {
        id: order!.id!,
        client: clientId!,
        totalPrice,
        additionalDetails,
        subtotalPrice,
        items: items.map(adaptCartItemToOrderItem),
        status: order!.status,
      },
    });
  };

  const handleSubmit = () => {
    if (updateMode) {
      updateOrder();
    } else {
      createOrder();
    }
  };
  const handleClickConfirmOrder = () => {
    onSubmit?.();
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
            {updateMode ? 'Actualizar orden' : 'Crear orden pendiente'}
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

import { useRef } from 'react';
import ClientForm from './ClientForm';
import {
  getAdditionalDetails,
  getCartItems,
  getClientId,
  getDiscountAmount,
  getDiscountType,
  getSetAdditionalDetails,
  getSetDiscountAmount,
  getSetDiscountType,
  getSubtotalPrice,
  getTotalPrice,
  useCartStore,
} from '@/contexts/CartStore';
import { ICartItem } from '@/interfaces/ICart';
import useCreateOrderMutation from '@/hooks/services/useCreateOrderMutation';
import Loader from './Loader';
import useUpdateOrderMutation from '@/hooks/services/useUpdateOrderMutation';
import { IDiscount, IOrder, IOrderItem } from '@/interfaces/IOrder';
import { useForm } from 'react-hook-form';
import { DiscountTypeControl } from './DiscountTypeControl';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
}

export const ConfirmOrder = ({ updateMode, order, onSubmit }: IProps) => {
  const {} = useForm();

  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalPrice);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems) as ICartItem[];
  const addClientId = useCartStore((state) => state.addClientId);
  const clientId = useCartStore(getClientId);
  const setAdditionalDetails = useCartStore(getSetAdditionalDetails);
  const setDiscountType = useCartStore(getSetDiscountType);
  const setDiscountAmount = useCartStore(getSetDiscountAmount);
  const discountType = useCartStore(getDiscountType);
  const discountAmount = useCartStore(getDiscountAmount);

  const orderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation({
    onSuccess: () => {
      onSubmit?.();
    },
  });

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
      discount: { amount: discountAmount!, type: discountType! },
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
        discount: { amount: discountAmount!, type: discountType! },
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

  const handleChangeAdditionalsDetails = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAdditionalDetails(e.target.value);
  };

  const handleChangeDiscountType = (discount: IDiscount) => {
    setDiscountType(discount.type);
    setDiscountAmount(discount.amount);
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
      <div className="flex flex-row gap-3 w-full">
        <button className="btn btn-primary" onClick={handleClickConfirmOrder}>
          Pasar Orden
        </button>
        {updateMode ? (
          <button className="btn btn-error" onClick={onSubmit}>
            Cancelar
          </button>
        ) : null}
      </div>
      <dialog ref={ref} className="border-4 rounded-3xl py-5 px-10">
        <section className="flex flex-row items-center gap-10">
          <ClientForm
            onSelect={(client) => addClientId(client?.id || null)}
            defaultClient={order?.client}
          />

          <div className="flex flex-col">
            <label className="label">Detalles adicionales:</label>
            <textarea
              className="textarea textarea-bordered h-36"
              value={additionalDetails}
              onChange={handleChangeAdditionalsDetails}
            />
            <DiscountTypeControl
              onChange={handleChangeDiscountType}
              discountAmount={order?.discount?.amount}
              discountType={order?.discount?.type}
            />
          </div>
        </section>
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

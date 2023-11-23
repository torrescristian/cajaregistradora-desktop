import { useMemo, useRef, useState } from 'react';
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
} from '@/modules/cart/contexts/useCartStore';
import useCreateOrderMutation from '@/modules/cart/hooks/useCreateOrderMutation';
import Loader from '@/modules/common/components/Loader';
import useUpdateOrderMutation from '@/modules/cart/hooks/useUpdateOrderMutation';
import {
  DISCOUNT_TYPE,
  IDiscount,
  IOrder,
  IOrderItem,
} from '@/modules/ordenes/interfaces/IOrder';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/ValidateCoupon';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';

import { IPayment } from '@/modules/recibos/interfaces/ITicket';
import useCreateTicketMutation from '@/modules/ordenes/hooks/useCreateTicketMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { calcDiscount, formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePrintService from '@/modules/common/hooks/usePrintService';
import Payments from '@/modules/ordenes/components/Payments';
import { ICartItem, IPromoItem } from '../interfaces/ICart';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  promoItems?: IPromoItem[];
}

export const ConfirmOrder = ({
  updateMode,
  order,
  onSubmit,
  promoItems,
}: IProps) => {
  // TODO: Create clear cart
  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalPrice);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems) as ICartItem[];
  const addClientId = useCartStore((state) => state.addClientId);
  const clientId = useCartStore(getClientId);
  const setAdditionalDetails = useCartStore(getSetAdditionalDetails);
  const setDiscountType = useCartStore(getSetDiscountType);
  const setDiscountAmount = useCartStore(getSetDiscountAmount);
  const discountType = useCartStore(getDiscountType) || DISCOUNT_TYPE.FIXED;
  const discountAmount = useCartStore(getDiscountAmount) || 0;

  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [coupon, setCoupon] = useState<ICoupon>();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const { printOrder, printCommand, printInvoice } = usePrintService();

  const newTotalPrice = useMemo(
    () =>
      calcDiscount({
        discountAmount,
        discountType,
        price: (order?.totalPrice || subtotalPrice) - couponDiscount,
      }),
    [
      subtotalPrice,
      couponDiscount,
      discountAmount,
      discountType,
      order?.totalPrice,
    ],
  );

  const orderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation({
    onSuccess: () => {
      onSubmit?.();
    },
  });

  const createTicketMutation = useCreateTicketMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();

  const ref = useRef<HTMLDialogElement>(null);

  const adaptCartItemToOrderItem = (cartItem: ICartItem): IOrderItem => {
    return {
      product: cartItem.product,
      quantity: cartItem.quantity,
      selectedVariant: cartItem.selectedVariant,
      price: cartItem.selectedVariant.price,
    };
  };

  const clearForm = () => {};
  const createOrder = async () => {
    const { orderResponse } = await orderMutation.mutateAsync({
      items,
      totalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
      discount: { amount: discountAmount!, type: discountType! },
      coupon,
      promoItems: promoItems!,
    });

    await printOrder(orderResponse.data.id);
    await printCommand(orderResponse.data.id);
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
        coupon,
        promoItems: promoItems!,
      },
    });
  };

  const handleSubmit = () => {
    if (updateMode) {
      updateOrder();
    } else {
      createOrder();
    }
    clearForm();
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

  const handleCouponDiscountAmount = ({
    couponDiscount,
    coupon,
  }: {
    couponDiscount: number;
    coupon: ICoupon;
  }) => {
    setCouponDiscount(couponDiscount || 0);
    setCoupon(coupon);
  };

  const handleChangePayments = (newPayments: IPayment[]) => {
    setPayments(newPayments);
  };

  const handleCreateTicket = async () => {
    const sum = payments.reduce((acc, curr) => acc + Number(curr.amount), 0);
    if (sum !== newTotalPrice) {
      toast.error(
        `Se está cobrando ${formatPrice(sum)} de ${formatPrice(newTotalPrice)}`,
      );
      return;
    }

    const { orderResponse } = await orderMutation.mutateAsync({
      items,
      totalPrice: newTotalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
      discount: { amount: discountAmount!, type: discountType! },
      promoItems: promoItems!,
    });

    const { orderResponse: updatedOrderResponse, ticketResponse } =
      await createTicketMutation.mutateAsync({
        ticket: {
          order: orderResponse.data.id,
          totalPrice: newTotalPrice,
          cashBalance: activeCashBalanceQuery.cashBalance?.id!,
          payments,
          couponDiscount,
        },
        coupon: {
          id: coupon?.id,
          availableUses: coupon?.availableUses!,
        },
      });

    await printOrder(updatedOrderResponse.data.id);
    await printCommand(orderResponse.data.id);
    await printInvoice(ticketResponse.data.id);
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
      <div className="flex flex-row gap-3 w-full">
        <button
          className="btn btn-primary"
          onClick={handleClickConfirmOrder}
          disabled={!items.length && !promoItems!.length}
        >
          Pasar Orden
        </button>
        {updateMode ? (
          <button className="btn btn-error" onClick={onSubmit}>
            Cancelar
          </button>
        ) : null}
      </div>
      <dialog ref={ref} className="border-4 rounded-3xl py-5 px-10">
        <section className="flex flex-col sm:flex-row items-center sm:gap-10">
          <ClientForm
            onSelect={(client) => addClientId(client?.id || null)}
            defaultClient={order?.client}
          />

          <div className="flex flex-col gap-5">
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
            <ValidateCoupon
              onChange={handleCouponDiscountAmount}
              subtotalPrice={order?.subtotalPrice! || subtotalPrice}
              coupon={coupon}
            />
            <Payments onChange={handleChangePayments} />
            <DataItem
              label="Total:"
              value={formatPrice(newTotalPrice)}
              defaultValue=""
              className="text-2xl"
            />
          </div>
        </section>
        <div className="flex flex-col sm:flex-row justify-between pt-5">
          <button
            className="btn btn-link text-error"
            onClick={() => ref.current?.close()}
          >
            Cancelar
          </button>
          <button className="btn btn-link" onClick={handleCreateTicket}>
            Finalizar venta
          </button>
          <button
            onClick={handleSubmit}
            className="btn sticky top-0 z-20 sm:w-fit whitespace-nowrap btn-primary text-xl text-primary-content"
          >
            {updateMode ? 'Actualizar orden' : 'Crear orden pendiente'}
          </button>
        </div>
      </dialog>
    </section>
  );
};

import {
  DISCOUNT_TYPE,
  IDiscount,
  IOrder,
} from '@/modules/ordenes/interfaces/IOrder';
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
} from '../contexts/useCartStore';
import { ICartItem, IPromoItem } from '../interfaces/ICart';
import { useMemo, useRef, useState } from 'react';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import usePrintService from '@/modules/common/hooks/usePrintService';
import { calcDiscount, formatPrice } from '@/modules/common/libs/utils';
import useUpdateOrderMutation from './useUpdateOrderMutation';
import useCreateTicketMutation from '@/modules/ordenes/hooks/useCreateTicketMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { useModalStore } from '@/modules/common/contexts/useModalStore';
import { toast } from 'react-toastify';
import useCreateOrderMutation from './useCreateOrderMutation';
import usePayments from '@/modules/ordenes/hooks/usePayments';
import { adaptCartItemToOrderItem } from '@/modules/ordenes/utils/utils';
import { PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';

interface IProps {
  updateMode?: boolean;
  order?: IOrder;
  onSubmit?: () => void;
  promoItems?: IPromoItem[];
  closeUpdateMode?: () => void;
}

export default function useConfirmOrder({
  onSubmit,
  order,
  promoItems,
  updateMode,
}: IProps) {
  const additionalDetails = useCartStore(getAdditionalDetails);
  const totalPrice = useCartStore(getTotalPrice);
  const subtotalPrice = useCartStore(getSubtotalPrice);
  const items = useCartStore(getCartItems) as ICartItem[];
  const addClientId = useCartStore((state) => state.addClientId);
  const clientId = useCartStore(getClientId);
  const setAdditionalDetails = useCartStore(getSetAdditionalDetails);
  const setDiscountType = useCartStore(getSetDiscountType);
  const setDiscountAmount = useCartStore(getSetDiscountAmount);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const discountAmount = useCartStore(getDiscountAmount) || '';
  const discountType = useCartStore(getDiscountType) || DISCOUNT_TYPE.FIXED;

  const newTotalPrice = calcDiscount({
    price: order?.totalPrice || totalPrice,
    discountAmount: couponDiscount,
    discountType: DISCOUNT_TYPE.FIXED,
  });

  const [coupon, setCoupon] = useState<ICoupon>();

  const paymentProps = usePayments({ totalPrice: newTotalPrice });

  const { printInvoice, printCommand } = usePrintService();

  const ref = useRef<HTMLDialogElement>(null);
  const orderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation({
    onSuccess: () => {
      onSubmit?.();
    },
  });

  const createTicketMutation = useCreateTicketMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();
  const { closeModal } = useModalStore();

  const clearForm = () => {};
  const createOrder = async () => {
    const { orderResponse } = await orderMutation.mutateAsync({
      items,
      totalPrice: newTotalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
      discount: { amount: Number(discountAmount!), type: discountType! },
      coupon,
      promoItems: promoItems!,
    });
    await printCommand(orderResponse.data.id);
    closeModal();
  };

  const updateOrder = () => {
    updateOrderMutation.mutate({
      order: {
        id: order!.id!,
        client: clientId!,
        totalPrice: newTotalPrice,
        additionalDetails,
        subtotalPrice,
        discount: { amount: Number(discountAmount!), type: discountType! },
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
    closeModal();
    clearForm();
  };

  const handleChangeAdditionalsDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAdditionalDetails(e.target.value);
  };

  const handleChangeDiscountType = (discount: IDiscount) => {
    setDiscountType(discount.type);
    setDiscountAmount(discount.amount);
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

  const handleCreateTicket = async () => {
    const sum =
      paymentProps.cashAmount +
      paymentProps.creditAmount +
      paymentProps.debitAmount;

    if (paymentProps.type === PAYMENT_TYPE.MULTIPLE && sum !== newTotalPrice) {
      toast.error(
        `Se está cobrando ${formatPrice(sum)} de ${formatPrice(newTotalPrice)}`,
      );
      return;
    }

    let payments: IPayment[] = [];
    if (paymentProps.type === PAYMENT_TYPE.MULTIPLE) {
      payments = [
        {
          type: PAYMENT_TYPE.CASH,
          amount: paymentProps.cashAmount,
        },
        {
          type: PAYMENT_TYPE.CREDIT,
          amount: paymentProps.creditAmount,
        },
        {
          type: PAYMENT_TYPE.DEBIT,
          amount: paymentProps.debitAmount,
        },
      ].filter(({ amount }) => Boolean(amount));
    } else {
      payments = [
        {
          type: paymentProps.type,
          amount: newTotalPrice,
        },
      ];
    }

    const { orderResponse } = await orderMutation.mutateAsync({
      items,
      totalPrice: newTotalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
      discount: { amount: Number(discountAmount!), type: discountType! },
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
        discount: orderResponse.data.attributes?.discount || {
          amount: Number(discountAmount!),
          type: discountType!,
        },
      });

    closeModal();
    await printInvoice(ticketResponse.data.id);
    await printCommand(updatedOrderResponse.data.id);
  };
  const handleClickConfirmOrder = () => {
    ref.current?.showModal();
  };

  return {
    addClientId,
    additionalDetails,
    closeModal,
    coupon,
    discountAmount,
    discountType,
    handleChangeAdditionalsDetails,
    handleChangeDiscountType,
    handleClickConfirmOrder,
    handleCouponDiscountAmount,
    handleCreateTicket,
    handleSubmit,
    items,
    newTotalPrice,
    orderMutation,
    paymentProps,
    ref,
    setDiscountAmount,
    setDiscountType,
    subtotalPrice,
  };
}

import {
  DISCOUNT_TYPE,
  IDiscount,
  IOrder,
  IOrderItem,
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

  const newTotalPrice = useMemo(
    () => (order?.totalPrice || totalPrice) - couponDiscount,
    [totalPrice, couponDiscount, order?.totalPrice],
  );
  const [coupon, setCoupon] = useState<ICoupon>();

  const {
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleDeletePayment,
    payments,
  } = usePayments({ newTotalPrice });

  const { printOrder, printCommand, printInvoice } = usePrintService();

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
      totalPrice: newTotalPrice,
      additionalDetails,
      clientId,
      subtotalPrice,
      discount: { amount: Number(discountAmount!), type: discountType! },
      coupon,
      promoItems: promoItems!,
    });

    await printOrder(orderResponse.data.id);
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
    e: React.ChangeEvent<HTMLTextAreaElement>,
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
      });

    closeModal();
    await printOrder(updatedOrderResponse.data.id);
    await printCommand(orderResponse.data.id);
    await printInvoice(ticketResponse.data.id);
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
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleClickConfirmOrder,
    handleCouponDiscountAmount,
    handleCreateTicket,
    handleDeletePayment,
    handleSubmit,
    items,
    newTotalPrice,
    orderMutation,
    payments,
    ref,
    setDiscountAmount,
    setDiscountType,
    subtotalPrice,
  };
}

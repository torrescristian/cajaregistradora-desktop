import { DISCOUNT_TYPE, IOrder } from '../interfaces/IOrder';
import useCreateTicketMutation from './useCreateTicketMutation';
import useCancelOrderMutation from './useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { useState } from 'react';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { toast } from 'react-toastify';
import { calcDiscount } from '@/modules/common/libs/utils';
import usePayments from './usePayments';
import useCalcDiscountType from '@/modules/common/hooks/useCalcDiscountType';
import usePrintService from '@/modules/common/hooks/usePrintService';
import useValidateCoupon from './useValidateCoupon';
import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';

interface IProps {
  order: IOrder;
  onSubmit?: (order: IOrder) => void;
}

export default function useCreateTicketForm({ order, onSubmit }: IProps) {
  const createTicketMutation = useCreateTicketMutation();
  const cancelOrderMutation = useCancelOrderMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [additionalDetails, setAdditionalDetails] = useState(
    order.additionalDetails || '',
  );

  const { discountAmount, discountType, setDiscountAmount, setDiscountType } =
    useCalcDiscountType({
      discountAmount: order.discount?.amount,
      discountType: order.discount?.type,
    });
  const finalTotalPrice = calcDiscount({
    price: order.totalPrice,
    discountAmount: Number(discountAmount),
    discountType,
  });

  const [coupon, setCoupon] = useState<ICoupon | undefined>(order.coupon);
  const [isCheckedAcordion, setIsCheckedAcordion] = useState(false);

  const paymentProps = usePayments();

  const { handleClearInputCode } = useValidateCoupon({
    coupon: order.coupon!,
    subtotalPrice: finalTotalPrice,
  });

  const { printInvoice } = usePrintService();

  const handleClearForm = () => {
    setAdditionalDetails('');
    setDiscountAmount(0);
    setDiscountType(DISCOUNT_TYPE.FIXED);
    setCouponDiscount(0);
    setCoupon(undefined);
    setIsCheckedAcordion(false);
    handleClearInputCode();
  };

  const handleToggleAccordion = () => {
    setIsCheckedAcordion(!isCheckedAcordion);
  };
  const handleCancelOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await cancelOrderMutation.mutateAsync(order);
      toast.success('Orden cancelada con exito');
    } catch (e) {
      toast.error('No se pudo cancelar la orden');
    }
    window.location.reload();
  };

  const handleSubmitCreateTicket = async () => {
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
          amount: finalTotalPrice,
        },
      ];
    }

    try {
      const { ticketResponse } = await createTicketMutation.mutateAsync({
        ticket: {
          order: order.id!,
          totalPrice: finalTotalPrice,
          cashBalance: activeCashBalanceQuery.cashBalance?.id!,
          payments,
          couponDiscount,
        },
        coupon: {
          id: order.coupon?.id || coupon?.id,
          availableUses: order.coupon?.availableUses || coupon?.availableUses!,
        },
        discount: {
          amount: Number(discountAmount),
          type: discountType,
        },
      });

      await printInvoice(ticketResponse.data.id);
      handleClearForm();
      window.location.reload();
      toast.success('Pagado con exito');
    } catch (error) {
      console.error(error);
      toast.error(`No se está cobrando correctamente`);
    }
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

  const handleToggleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit?.(order);
  };
  const handleChangeAdditionalsDetails = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAdditionalDetails(e.target.value);
  };

  return {
    additionalDetails,
    setAdditionalDetails,
    handleChangeAdditionalsDetails,
    setDiscountAmount,
    setDiscountType,
    handleCouponDiscountAmount,
    handleSubmitCreateTicket,
    handleToggleAccordion,
    isCheckedAcordion,
    cancelOrderMutation,
    handleCancelOrder,
    createTicketMutation,
    finalTotalPrice,
    discountType,
    discountAmount,
    coupon,
    handleToggleEdit,
    paymentProps,
  };
}

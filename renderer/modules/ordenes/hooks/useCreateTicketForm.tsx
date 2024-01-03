import { IPromoItem } from '@/modules/cart/interfaces/ICart';
import { DISCOUNT_TYPE, IOrder } from '../interfaces/IOrder';
import useCreateTicketMutation from './useCreateTicketMutation';
import useCancelOrderMutation from './useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { useState } from 'react';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { calcDiscount } from '@/modules/common/libs/utils';
import usePayments from './usePayments';
import useCalcDiscountType from '@/modules/common/hooks/useCalcDiscountType';
import usePrintService from '@/modules/common/hooks/usePrintService';

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
  const finalTotalPrice =
    order.totalPrice - couponDiscount - Number(discountAmount);

  const [coupon, setCoupon] = useState<ICoupon | undefined>(order.coupon);
  const [isCheckedAcordion, setIsCheckedAcordion] = useState(false);

  const {
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleDeletePayment,
    payments,
  } = usePayments({ newTotalPrice: finalTotalPrice });

  const { printOrder } = usePrintService()

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
  };

  const handleSubmitCreateTicket = async () => {
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
      });

      await printOrder(ticketResponse.data.id)
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
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleCouponDiscountAmount,
    handleDeletePayment,
    payments,
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
  };
}

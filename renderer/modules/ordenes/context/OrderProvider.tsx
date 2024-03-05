import { OrderContext } from './OrderContext';
import useCreateTicketForm from '../hooks/useCreateTicketForm';
import { IOrder } from '../interfaces/IOrder';

interface IProps {
  children: any;
  order: IOrder;
  onSubmit?: (order: IOrder) => void;
  className?: string;
  disableRow?: boolean;
}

export default function OrderProvider({ children, order, onSubmit }: IProps) {
  const {
    additionalDetails,
    cancelOrderMutation,
    coupon,
    createTicketMutation,
    discountAmount,
    discountType,
    finalTotalPrice,
    handleCancelOrder,
    handleChangeAdditionalsDetails,
    handleCouponDiscountAmount,
    handleSubmitCreateTicket,
    handleToggleEdit,
    paymentProps,
    setAdditionalDetails,
    setDiscountAmount,
    setDiscountType,
  } = useCreateTicketForm({ order, onSubmit });

  return (
    <OrderContext.Provider
      value={{
        additionalDetails,
        cancelOrderMutation,
        coupon,
        createTicketMutation,
        discountAmount,
        discountType,
        finalTotalPrice,
        handleCancelOrder,
        handleChangeAdditionalsDetails,
        handleCouponDiscountAmount,
        handleSubmitCreateTicket,
        handleToggleEdit,
        order,
        paymentProps,
        setAdditionalDetails,
        setDiscountAmount,
        setDiscountType,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

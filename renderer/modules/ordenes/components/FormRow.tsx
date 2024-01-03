import { OrderContext } from '../context/OrderContext';
import useCreateTicketForm from '../hooks/useCreateTicketForm';
import { IOrder } from '../interfaces/IOrder';

interface IProps {
  children: any;
  order: IOrder;
  onSubmit: (order: IOrder) => void;
}

export default function FormRow({ children, order, onSubmit }: IProps) {
  const {
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleCouponDiscountAmount,
    handleDeletePayment,
    payments,
    handleSubmitCreateTicket,
    cancelOrderMutation,
    handleCancelOrder,
    createTicketMutation,
    finalTotalPrice,
    discountType,
    discountAmount,
    coupon,
    setDiscountAmount,
    handleToggleEdit,
    setDiscountType,
    additionalDetails,
    handleChangeAdditionalsDetails,
    setAdditionalDetails,
  } = useCreateTicketForm({ order, onSubmit });

  return (
    <OrderContext.Provider
      value={{
        handleChangePayment,
        handleClickAddPaymentMethod,
        handleCouponDiscountAmount,
        handleDeletePayment,
        payments,
        handleSubmitCreateTicket,
        cancelOrderMutation,
        handleCancelOrder,
        createTicketMutation,
        finalTotalPrice,
        discountType,
        discountAmount,
        coupon,
        setDiscountAmount,
        setDiscountType,
        order,
        handleToggleEdit,
        additionalDetails,
        handleChangeAdditionalsDetails,
        setAdditionalDetails,
      }}
    >
      <tr>{children}</tr>
    </OrderContext.Provider>
  );
}

import { OrderContext } from '../context/OrderContext';
import useCreateTicketForm from '../hooks/useCreateTicketForm';
import { IOrder } from '../interfaces/IOrder';

interface IProps {
  children: any;
  order: IOrder;
  onSubmit: (order: IOrder) => void;
  className?: string;
  disableRow?: boolean;
}

export default function FormRow({
  children,
  order,
  onSubmit,
  className,
  disableRow,
}: IProps) {
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
      {disableRow ? (
        <div className={className}>{children}</div>
      ) : (
        <tr className={className}>{children}</tr>
      )}
    </OrderContext.Provider>
  );
}

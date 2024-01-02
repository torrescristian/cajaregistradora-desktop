import { createContext } from 'react';
import { DISCOUNT_TYPE, IOrder } from '../interfaces/IOrder';
import { IPayment } from '@/modules/recibos/interfaces/ITicket';
import useCreateTicketForm from '../hooks/useCreateTicketForm';

type OrderContextProps = Omit<
  ReturnType<typeof useCreateTicketForm>,
  'handleToggleAccordion' | 'isCheckedAcordion'
> & {
  order: IOrder;
  handleToggleEdit: (e: React.MouseEvent) => void;
};

export const OrderContext = createContext<OrderContextProps>({
  cancelOrderMutation: (() => {}) as any,
  coupon: [] as any,
  createTicketMutation: (() => {}) as any,
  discountAmount: 0,
  discountType: DISCOUNT_TYPE.FIXED,
  finalTotalPrice: 0,
  handleCancelOrder: (() => {}) as any,
  handleChangePayment: (newPayment: IPayment) => {},
  handleClickAddPaymentMethod: () => {},
  handleCouponDiscountAmount: () => {},
  handleDeletePayment: () => {},
  handleSubmitCreateTicket: (() => {}) as unknown as any,
  order: {} as IOrder,
  payments: [] as IPayment[],
  setDiscountAmount: () => {},
  setDiscountType: () => {},
  handleToggleEdit: () => {},
  additionalDetails: '',
  handleChangeAdditionalsDetails: () => {},
  setAdditionalDetails: () => {},
});

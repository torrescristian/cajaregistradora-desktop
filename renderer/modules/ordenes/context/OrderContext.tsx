import { createContext } from 'react';
import { DISCOUNT_TYPE, IOrder } from '../interfaces/IOrder';
import { IPayment } from '@/modules/recibos/interfaces/ITicket';
import useConfirmSaleForm from '../hooks/useConfirmSaleForm';

type OrderContextProps = Omit<
  ReturnType<typeof useConfirmSaleForm>,
  'handleToggleAccordion' | 'isCheckedAcordion'
> & {
  order: IOrder;
  handleToggleEdit: (e: React.MouseEvent) => void;
};

export const OrderContext = createContext<OrderContextProps>({
  additionalDetails: '',
  cancelOrderMutation: (() => {}) as any,
  coupon: [] as any,
  createTicketMutation: (() => {}) as any,
  discountAmount: 0,
  discountType: DISCOUNT_TYPE.FIXED,
  finalTotalPrice: 0,
  handleCancelOrder: (() => {}) as any,
  handleChangeAdditionalsDetails: () => {},
  handleCouponDiscountAmount: () => {},
  handleSubmitCreateTicket: (() => {}) as unknown as any,
  handleToggleEdit: () => {},
  order: {} as IOrder,
  setAdditionalDetails: () => {},
  setDiscountAmount: () => {},
  setDiscountType: () => {},
  paymentProps: {} as any,
});

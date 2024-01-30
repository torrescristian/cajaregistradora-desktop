import {
  PAYMENT_TYPE,
  TICKET_STATUS,
} from '@/modules/recibos/interfaces/ITicket';
import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = (order: any = OrderSchema()) =>
  yup
    .object()
    .shape({
      cashBalance: yup.number(),
      couponDiscount: yup.number(),
      order: yup.number().required(),
      payments: yup
        .array()
        .of(
          yup.object().shape({
            amount: yup.number().required(),
            type: yup
              .string()
              .oneOf([
                PAYMENT_TYPE.CASH,
                PAYMENT_TYPE.CREDIT,
                PAYMENT_TYPE.DEBIT,
              ])
              .required(),
          }),
        )
        .required(),
      status: yup
        .string()
        .oneOf([
          TICKET_STATUS.PAID,
          TICKET_STATUS.REFUNDED,
          TICKET_STATUS.WAITING_FOR_REFUND,
        ]),
      totalPrice: yup.number().required(),
    })
    .defined()
    .required();

export const TicketPayloadSchema = () => TicketSchema(yup.number());
export default TicketSchema;

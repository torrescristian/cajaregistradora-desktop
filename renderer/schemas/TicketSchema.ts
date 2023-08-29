import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = (order: any = OrderSchema()) =>
  yup
    .object()
    .shape({
      totalPrice: yup.number().required(),
      order: order.required(),
      payments : yup.array().of(yup.object().shape({
        amount: yup.number().required(),
        type: yup.string().required(),
      }))
    })
    .defined()
    .required();

export const TicketPayloadSchema = () => TicketSchema(yup.number());
export default TicketSchema;

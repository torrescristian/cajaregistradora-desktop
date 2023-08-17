import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = (order: any = OrderSchema()) =>
  yup
    .object()
    .shape({
      total_price: yup.number().required(),
      order: order.required(),
    })
    .defined()
    .required();


export const TicketPayloadSchema = () => TicketSchema(yup.number())
export default TicketSchema;

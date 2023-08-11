import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = (order: any = yup.number()) =>
  yup
    .object()
    .shape({
      total_price: yup.number().required(),
      order: order.required(),
    })
    .defined()
    .required();


export const TicketSchemaExpanded = () => TicketSchema(OrderSchema())
export default TicketSchema;

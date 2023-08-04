import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = (order: any = OrderSchema().required()) => yup
  .object().shape({
    date: yup.string().required(),
    total_price: yup.number().required(),
    order,
}).defined().required();

export default TicketSchema;

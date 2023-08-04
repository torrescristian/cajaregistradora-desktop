import * as yup from 'yup';
import OrderSchema from './OrderSchema';

const TicketSchema = yup
  .object()
  .shape({
    date: yup.string().required(),
    total_price: yup.number().required(),
    order: OrderSchema().required(),
  })
  .defined()
  .required();

export default TicketSchema;

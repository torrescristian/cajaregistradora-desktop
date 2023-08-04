import * as yup from 'yup';
import ClientSchema from './ClientSchema';
import OrderItemsSchema from './OrderItemsSchema';
import ProductShape from './ProductShape';

const OrderSchema = (orderItemsSchema = ProductShape().required()) => yup.object().shape({
  id: yup.number().required(),
  date: yup.string().required(),
  total_price: yup.number().required(),
  items: yup.array().of(OrderItemsSchema(orderItemsSchema)).required(),
  client: ClientSchema().required(),
  createAt: yup.string(),
  updatedAt: yup.string(),
})

export default OrderSchema;

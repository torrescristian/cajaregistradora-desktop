import * as yup from 'yup';
import ClientSchema from './ClientSchema';
import OrderItemsSchema from './OrderItemsSchema';
import ProductSchema from './ProductSchema';

const OrderSchema = (orderItemsSchema = ProductSchema().required()) =>
  yup.object().shape({
    id: yup.number().required(),
    total_price: yup.number().required(),
    items: yup.array().of(OrderItemsSchema(orderItemsSchema)).required(),
    client: ClientSchema().required(),
    createAt: yup.string(),
    updatedAt: yup.string(),
    additional_details: yup.string(),
    status: yup.string(),
  });

export default OrderSchema;

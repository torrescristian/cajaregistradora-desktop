import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import * as yup from 'yup';
import ClientSchema from './ClientSchema';
import OrderItemsSchema from './OrderItemsSchema';
import ProductPayloadSchema from './ProductPayloadSchema';

const OrderSchema = (orderItemsSchema = ProductPayloadSchema().required()) =>
  yup.object().shape({
    additionalDetails: yup.string(),
    client: ClientSchema().required(),
    createAt: yup.string(),
    coupon: yup.number(),
    discount: yup.object().shape({
      amount: yup.number(),
      type: yup.string().oneOf([DISCOUNT_TYPE.FIXED, DISCOUNT_TYPE.PERC]),
    }),
    id: yup.number().required(),
    items: yup.array().of(OrderItemsSchema(orderItemsSchema)).required(),
    status: yup.string(),
    subtotalPrice: yup.number().required(),
    totalPrice: yup.number().required(),
    updatedAt: yup.string(),
  });

export default OrderSchema;

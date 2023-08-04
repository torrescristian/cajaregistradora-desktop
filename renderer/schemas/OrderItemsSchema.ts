import * as yup from 'yup';
import ProductShape from './ProductShape';

const OrderItemsSchema = (product: any = yup.number()) => yup.object().shape({
  quantity: yup.number().required(),
  price: yup.number().required(),
  product,
})

export default OrderItemsSchema;

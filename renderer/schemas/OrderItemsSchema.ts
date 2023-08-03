import * as yup from 'yup'
import ProductShape from './ProductShape';

const OrderItemsSchema = () => yup.object().shape({
  quantity: yup.number().required(),
  price: yup.number().required(),
  product: ProductShape().required(),
})

export default OrderItemsSchema;

import * as yup from 'yup';
import VariantSchema from './VariantSchema';

const OrderItemsSchema = (product: any = yup.number()) =>
  yup.object().shape({
    quantity: yup.number().required(),
    price: yup.number().required(),
    product,
    selectedVariant: VariantSchema(),
  });

export default OrderItemsSchema;

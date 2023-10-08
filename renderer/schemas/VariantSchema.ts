import * as yup from 'yup';
import ProductPayloadSchema from './ProductPayloadSchema';

const VariantSchema = (productSchema = ProductPayloadSchema) =>
  yup.object().shape({
    id: yup.number().required(),
    product: productSchema().required(),
    price: yup.number().required(),
    name: yup.string().required(),
  });

export default VariantSchema;

import { productTypes } from '@/interfaces/IProduct';
import * as yup from 'yup';

const ProductPayloadSchema = () =>
  yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    variants: yup.array().of(yup.number()),
    isService: yup.boolean().required(),
    default_variants: yup.number(),
    image: yup.object().required(),
    type: yup.string().oneOf(productTypes),
  });

export default ProductPayloadSchema;

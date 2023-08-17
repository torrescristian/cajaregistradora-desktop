import * as yup from 'yup';
import ProductSchema from './ProductSchema';

const VariantSchema = (productSchema = ProductSchema) =>
    yup.object().shape({
        id: yup.number().required(),
        product: productSchema().required(),
        price : yup.number().required(),
        name: yup.string().required(),
      });

export default VariantSchema;
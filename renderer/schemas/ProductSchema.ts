import * as yup from 'yup';

const ProductSchema = () =>
  yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    isService: yup.boolean().required(),
    image: yup.object().required(),
  });

export default ProductSchema;

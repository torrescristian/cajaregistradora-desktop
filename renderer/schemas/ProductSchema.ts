import * as yup from 'yup';


const ProductSchema = () =>
  yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    store: yup.number().required(),
    isService: yup.boolean().required(),
    image: yup.string().required(),
    
  });

export default ProductSchema;

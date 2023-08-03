import * as yup from 'yup'

const ProductShape = () => yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  disabled: yup.boolean(),
  isService: yup.boolean().required(),
  public_price: yup.number().required(),
  wholesale_price: yup.number().required(),
  catalog_price: yup.number().required(),
  special_price: yup.number().required(),
  image: yup.string().required(),
})

export default ProductShape;

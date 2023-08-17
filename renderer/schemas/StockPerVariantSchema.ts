import * as yup from 'yup';
import VariantSchema from './VariantSchema';


const StockPerVariantSchema = (variantSchema = VariantSchema ) =>
  yup.object().shape({
    variant: variantSchema().required(),
    stock: yup.number().required(),
  });
  export default StockPerVariantSchema;
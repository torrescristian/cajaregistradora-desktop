import * as yup from 'yup';

const useVariant = () => {
  const categorySchema = yup.number().positive().integer();
  const schema = yup
    .object({
      categories: yup
        .array(yup.number().positive().integer().required())
        .required(),
      product: yup.number().positive().integer().required(),
      stock: yup.number().positive().integer().required(),
    })
    .required();

  return {
    schema,
  };
};

export default useVariant;

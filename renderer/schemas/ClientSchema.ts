import * as yup from 'yup'

const ClientSchema = () => yup.object().shape({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  address: yup.string().required(),
  id: yup.number(),
})

export default ClientSchema;

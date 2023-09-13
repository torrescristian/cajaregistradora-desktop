import { PAYMENT_TYPE } from "@/interfaces/ITicket";

export const paymentTypesAndLabels = [
  {
    type: PAYMENT_TYPE.CREDIT,
    label: 'Crédito',
  },
  {
    type: PAYMENT_TYPE.CASH,
    label: 'Efectivo',
  },
  {
    type: PAYMENT_TYPE.DEBIT,
    label: 'Débito',
  },
] as const;

export const getLabelByPaymentType = (type: PAYMENT_TYPE) => {
  const label = paymentTypesAndLabels.find(p => p.type === type)!.label

  if (!label) throw new Error(`Missing Payment Type ${type}`)

  return label
}
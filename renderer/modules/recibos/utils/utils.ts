import { PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';

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
  {
    type: PAYMENT_TYPE.MULTIPLE,
    label: 'Mixto',
  },
] as const;

export const getLabelByPaymentType = (type: PAYMENT_TYPE) => {
  const label = paymentTypesAndLabels.find((p) => p.type === type)!.label;

  if (!label) throw new Error(`Missing Payment Type ${type}`);

  return label;
};

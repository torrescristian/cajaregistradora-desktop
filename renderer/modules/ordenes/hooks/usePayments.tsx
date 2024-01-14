import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { useState } from 'react';

interface IProps {
  newTotalPrice: number;
}

export default function usePayments({ newTotalPrice }: IProps) {
  const [payments, setPayments] = useState<IPayment[]>([
    {
      uuid: crypto.randomUUID(),
      amount: newTotalPrice!,
      type: PAYMENT_TYPE.CASH,
    },
  ]);

  const handleChangePayment = (newPayment: IPayment) => {
    setPayments((ps) =>
      ps.map((p) => {
        if (p.uuid === newPayment.uuid) {
          return newPayment;
        }
        return p;
      }),
    );
  };

  const handleDeletePayment = (uuid: string) => {
    if (payments.length <= 1) return;

    setPayments((ps) => ps.filter((p) => p.uuid !== uuid));
  };

  const handleClickAddPaymentMethod = () => {
    if (payments.length < 2) {
      setPayments((ps) => [
        ...ps,
        {
          uuid: crypto.randomUUID(),
          type: PAYMENT_TYPE.CREDIT,
          amount: newTotalPrice!,
        },
      ]);
    }
  };

  return {
    handleChangePayment,
    handleDeletePayment,
    handleClickAddPaymentMethod,
    payments,
    setPayments,
  };
}

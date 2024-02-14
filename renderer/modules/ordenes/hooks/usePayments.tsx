import { PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { useState } from 'react';

interface IReturn {
  cashAmount: number;
  creditAmount: number;
  debitAmount: number;
  handleChangePayment: (
    type: PAYMENT_TYPE,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: PAYMENT_TYPE;
}

export default function usePayments(): IReturn {
  const [type, setType] = useState(PAYMENT_TYPE.CASH);
  const [cashAmount, setCashAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);

  const handleChangePayment =
    (selectedType: PAYMENT_TYPE) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      switch (selectedType) {
        case PAYMENT_TYPE.CASH: {
          return setCashAmount(value);
        }
        case PAYMENT_TYPE.DEBIT: {
          return setDebitAmount(value);
        }
        case PAYMENT_TYPE.CREDIT: {
          return setCreditAmount(value);
        }
      }
    };

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as PAYMENT_TYPE);
  };

  return {
    cashAmount,
    creditAmount,
    debitAmount,
    handleChangePayment,
    handleChangeType,
    type,
  };
}

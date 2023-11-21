import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Payment } from './Payment';
import { useState } from 'react';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';

interface IProps {
  onChange: (newPayments: IPayment[]) => void;
}

export default function Payments({ onChange }: IProps) {
  const [payments, setPayments] = useState<IPayment[]>([
    {
      amount: 0,
      type: PAYMENT_TYPE.CASH,
    },
  ]);

  const handleChange = (index: number) => (newPayment: IPayment) => {
    const newPayments = payments.map((p, i) => {
      if (i === index) {
        return newPayment;
      }

      return p;
    });

    setPayments(newPayments);
    onChange(newPayments);
  };

  const handleDelete = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (payments.length <= 1) return;

    const newPayments = payments.filter((p, i) => i !== index);
    setPayments(newPayments);
    onChange(newPayments);
  };

  const handleClickAddPaymentMethod = (e: any) => {
    e.preventDefault();
    const newPayments = [...payments];
    newPayments.push({
      type: PAYMENT_TYPE.CREDIT,
      amount: 0,
    });
    setPayments(newPayments);
    onChange(newPayments);
  };

  return (
    <section>
      <Divider className="text-stone-500">Formas de pago</Divider>
      {payments.map((payment: IPayment, index) => (
        <Payment
          key={index}
          onChange={handleChange(index)}
          onNewPayment={handleClickAddPaymentMethod}
          onDelete={handleDelete(index)}
          payment={payment}
        />
      ))}
    </section>
  );
}

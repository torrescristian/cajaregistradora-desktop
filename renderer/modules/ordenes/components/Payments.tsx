import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Payment } from './Payment';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';
import { useState } from 'react';
import FieldLabel from '@/modules/common/components/FieldLabel';
import { set } from 'date-fns';
import usePayments from '../hooks/usePayments';

interface IProps {
  payments: IPayment[];
  onChange: (payment: IPayment) => void;
  onNewPayment: () => void;
  onDelete: (uuid: string) => void;
  newTotalPrice?: number;
}

export default function Payments({
  onChange,
  onNewPayment,
  onDelete,
  payments,
  newTotalPrice,
}: IProps) {
  const { setPayments, handleClickAddPaymentMethod, handleDeletePayment } =
    usePayments({ newTotalPrice: newTotalPrice! });
  const [paymentMix, setPaymentMix] = useState(false);

  const handleChangePaymentMix = () => {
    if (paymentMix) {
      onDelete(payments[0].uuid!);
      setPayments([]);
    } else {
      onNewPayment();
    }
    setPaymentMix(!paymentMix);
  };
  return (
    <section>
      <Divider className="text-base-content">Formas de pago</Divider>
      <FieldLabel title="Pagar de forma Mixta" className="gap-5">
        <input
          type="checkbox"
          value={String(paymentMix)}
          onChange={handleChangePaymentMix}
          className="checkbox checkbox-primary"
        />
      </FieldLabel>
      {payments.map((payment: IPayment) => (
        <Payment
          key={payment.uuid}
          onChange={onChange}
          onNewPayment={onNewPayment}
          onDelete={onDelete}
          payment={payment}
          newTotalPrice={newTotalPrice!}
          paymentMix={paymentMix}
        />
      ))}
    </section>
  );
}

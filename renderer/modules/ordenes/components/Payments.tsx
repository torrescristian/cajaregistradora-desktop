import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Payment } from './Payment';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';

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
  return (
    <section>
      <Divider className="text-base-content">Formas de pago</Divider>
      {payments.map((payment: IPayment) => (
        <Payment
          key={payment.uuid}
          onChange={onChange}
          onNewPayment={onNewPayment}
          onDelete={onDelete}
          payment={payment}
          newTotalPrice={newTotalPrice!}
        />
      ))}
    </section>
  );
}

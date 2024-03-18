import { PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Selector } from '@/modules/common/components/molecules/Selector';
import { paymentTypesAndLabels } from '@/modules/recibos/utils/utils';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import FieldLabel from '@/modules/common/components/atoms/FieldLabel';
import usePayments from '../../hooks/usePayments';

export default function Payments({
  cashAmount,
  creditAmount,
  debitAmount,
  handleChangePayment,
  handleChangeType,
  type,
}: ReturnType<typeof usePayments>) {
  return (
    <section className="flex flex-col text-base-content gap-3">
      <div className="flex flex-row gap-3 w-full justify-between">
        <Selector
          className="w-full flex-1"
          onChange={handleChangeType}
          defaultValue={type}
          values={paymentTypesAndLabels.map(({ label, type }) => ({
            label,
            value: type,
          }))}
        />
      </div>
      <RenderIf condition={type === PAYMENT_TYPE.MULTIPLE}>
        <FieldLabel columnMode title="Efectivo">
          <input
            onChange={handleChangePayment(PAYMENT_TYPE.CASH)}
            value={cashAmount}
            placeholder="0.00"
            className="input input-bordered text-base-content w-28 sm:w-36 "
          />
        </FieldLabel>
        <FieldLabel columnMode title="Crédito">
          <input
            onChange={handleChangePayment(PAYMENT_TYPE.CREDIT)}
            value={creditAmount}
            placeholder="0.00"
            className="input input-bordered text-base-content w-28 sm:w-36 "
          />
        </FieldLabel>
        <FieldLabel columnMode title="Débito">
          <input
            onChange={handleChangePayment(PAYMENT_TYPE.DEBIT)}
            value={debitAmount}
            placeholder="0.00"
            className="input input-bordered text-base-content w-28 sm:w-36 "
          />
        </FieldLabel>
      </RenderIf>
    </section>
  );
}

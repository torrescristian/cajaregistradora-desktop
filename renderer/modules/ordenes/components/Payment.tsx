import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Selector } from '@/modules/common/components/Selector';
import { ChevronDoubleDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { paymentTypesAndLabels } from '@/modules/recibos/utils/utils';

interface IProps {
  onChange: (payment: IPayment) => void;
  onNewPayment: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  onDelete: React.MouseEventHandler;
  payment: IPayment;
}

export const Payment = ({
  onChange,
  onNewPayment,
  onDelete,
  payment,
}: IProps) => {
  const handleSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as PAYMENT_TYPE;
    onChange({
      ...payment,
      type,
    });
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const amount = value === '' ? '' : Number(value);
    onChange({
      ...payment,
      amount,
    });
  };

  return (
    <section className="w-min flex flex-row gap-2">
      <Selector
        onChange={handleSelectType}
        defaultValue={payment.type}
        values={paymentTypesAndLabels.map(({ label, type }) => ({
          label,
          value: type,
        }))}
      />
      <input
        onChange={handleChangeAmount}
        value={payment.amount}
        type="number"
        placeholder="0.00"
        className="input input-bordered w-36"
      />
      <div className="flex flex-row gap-2">
        <button className="btn btn-primary btn-square" onClick={onNewPayment}>
          <ChevronDoubleDownIcon className="w-4 h-4" />
        </button>
        <button className="btn btn-error btn-square" onClick={onDelete}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

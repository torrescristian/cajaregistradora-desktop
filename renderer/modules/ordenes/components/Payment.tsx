import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { Selector } from '@/modules/common/components/Selector';
import { ChevronDoubleDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { paymentTypesAndLabels } from '@/modules/recibos/utils/utils';
import { useMemo } from 'react';

interface IProps {
  onChange: (payment: IPayment) => void;
  onNewPayment: () => void;
  onDelete: (uuid: string) => void;
  payment: IPayment;
  newTotalPrice?: number;
}

export const Payment = ({
  onChange,
  onNewPayment,
  onDelete,
  payment,
  newTotalPrice,
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
    onChange({
      ...payment,
      amount: value === '' ? value : Number(value),
    });
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete(payment.uuid!);
  };

  const handleNewPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNewPayment();
  };

  return (
    <section className="flex flex-col text-base-content gap-3">
      <div className="flex flex-row gap-3 w-full justify-between">
        <Selector
          className="w-full flex-1"
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
          placeholder="0.00"
          className="input input-bordered text-base-content w-28 sm:w-36 "
        />
      </div>
      <div className="flex flex-row gap-2 w-full justify-end">
        <button
          className="btn btn-primary btn-square"
          onClick={handleNewPayment}
        >
          <ChevronDoubleDownIcon className="w-4 h-4" />
        </button>
        <button
          className="btn btn-error btn-square"
          onClick={handleClickDelete}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

import { DataItem } from '@/modules/common/components/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import ValidateCoupon from './ValidateCoupon';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import { IOrder } from '../interfaces/IOrder';
import React, { useContext, useRef } from 'react';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { CheckIcon } from '@heroicons/react/24/solid';
import { OrderContext } from '../context/OrderContext';
import Payments from './Payments';
import useCreateTicketForm from '../hooks/useCreateTicketForm';

interface IProps {
  order: IOrder;
}

export const ConfirmOrderModal = ({ order }: IProps) => {
  const {
    cancelOrderMutation,
    coupon,
    createTicketMutation,
    discountAmount,
    discountType,
    finalTotalPrice,
    handleCancelOrder,
    handleCouponDiscountAmount,
    handleSubmitCreateTicket,
    handleToggleAccordion,
    isCheckedAcordion,
    additionalDetails,
    handleChangeAdditionalsDetails,
    setAdditionalDetails,
    setDiscountAmount,
    setDiscountType,
    paymentProps,
  } = useCreateTicketForm({ order });

  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };
  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  return (
    <div>
      <button
        className="btn btn-success btn-outline text-neutral-content"
        onClick={handleOpenModal}
      >
        <CheckIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className="modal-box">
        <div>
          <div className="flex flex-col gap-5 ">
            <label className="label">Detalles adicionales:</label>
            <textarea
              className="textarea textarea-bordered"
              value={additionalDetails}
              onChange={handleChangeAdditionalsDetails}
            />
            <DiscountTypeControl
              onChangeAmount={setDiscountAmount}
              onChangeType={setDiscountType}
              discountAmount={discountAmount}
              discountType={discountType}
            />
            <ValidateCoupon
              onChange={handleCouponDiscountAmount}
              subtotalPrice={order?.subtotalPrice!}
              coupon={coupon}
            />
            <Payments {...paymentProps} />
            <DataItem
              label="Total:"
              value={formatPrice(finalTotalPrice)}
              defaultValue=""
              className="text-2xl"
            />
          </div>
          <ButtonClose label="Cerrar" onClick={handleCloseModal} />
          <button
            className="btn btn-primary"
            onClick={handleSubmitCreateTicket}
          >
            Confirmar Orden
          </button>
        </div>
      </dialog>
    </div>
  );
};

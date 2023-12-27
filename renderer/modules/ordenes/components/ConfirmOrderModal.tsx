import { DataItem } from '@/modules/common/components/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import Payments from './Payments';
import ValidateCoupon from './ValidateCoupon';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import { IOrder } from '../interfaces/IOrder';
import useConfirmOrder from '@/modules/cart/hooks/useConfirmOrder';
import React, { useRef } from 'react';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

interface IProps {
  order: IOrder;
}

export const ConfirmOrderModal = ({ order }: IProps) => {
  const {
    additionalDetails,
    handleChangeAdditionalsDetails,
    setDiscountAmount,
    setDiscountType,
    discountAmount,
    discountType,
    handleCouponDiscountAmount,
    subtotalPrice,
    coupon,
    payments,
    handleChangePayment,
    handleDeletePayment,
    handleClickAddPaymentMethod,
    newTotalPrice,
    handleCreateTicket,
  } = useConfirmOrder({ order });

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
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Confirmar Orden
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
              subtotalPrice={order?.subtotalPrice! || subtotalPrice}
              coupon={coupon}
            />
            <Payments
              newTotalPrice={newTotalPrice}
              payments={payments}
              onChange={handleChangePayment}
              onDelete={handleDeletePayment}
              onNewPayment={handleClickAddPaymentMethod}
            />
            <DataItem
              label="Total:"
              value={formatPrice(newTotalPrice)}
              defaultValue=""
              className="text-2xl"
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateTicket}>
            Confirmar Orden
          </button>
          <ButtonClose label="Cerrar" onClick={handleCloseModal} />
        </div>
      </dialog>
    </div>
  );
};

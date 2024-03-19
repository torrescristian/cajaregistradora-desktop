import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

import { DataItem } from '@/modules/common/components/atoms/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import { DiscountTypeControl } from '@/modules/common/components/molecules/DiscountTypeControl';
import { ButtonClose } from '@/modules/common/components/atoms/ButtonClose';
import ModalTemplate from '@/modules/common/components/templates/ModalTemplate';
import {
  getCloseModal,
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';

import ValidateCoupon from '../molecules/ValidateCoupon';
import { IOrder } from '../../interfaces/IOrder';
import Payments from '../molecules/Payments';
import useConfirmSaleForm from '../../hooks/useConfirmSaleForm';

interface IProps {
  order: IOrder;
}

const Modal = ({ order }: IProps) => {
  const {
    coupon,
    discountAmount,
    discountType,
    finalTotalPrice,
    handleCouponDiscountAmount,
    handleSubmitCreateTicket,
    setDiscountAmount,
    setDiscountType,
    paymentProps,
  } = useConfirmSaleForm({ order });

  const closeModal = useModalStore(getCloseModal);

  return (
    <ModalTemplate className="flex flex-col gap-4 items-center">
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
        className="text-2xl flex flex-row"
      />
      <div className="flex items-center">
        <ButtonClose label="Cerrar" onClick={closeModal} />
        <button className="btn btn-primary" onClick={handleSubmitCreateTicket}>
          Confirmar Orden
        </button>
      </div>
    </ModalTemplate>
  );
};

export const ConfirmOrderModal = ({ order }: IProps) => {
  const openModal = useModalStore(getOpenModal);

  return (
    <div>
      <button
        className="btn btn-square btn-success btn-outline text-neutral-content"
        onClick={() => openModal(<Modal order={order} />)}
      >
        <CheckIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

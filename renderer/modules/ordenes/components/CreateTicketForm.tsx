import {
  calcDiscount,
  formatPrice,
  parseDateToArgentinianFormat,
} from '@/modules/common/libs/utils';
import {
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { DataItem } from '@/modules/common/components/DataItem';
import { RenderIf } from '@/modules/common/components/RenderIf';
import {
  DISCOUNT_TYPE,
  IDiscount,
  IOrder,
} from '@/modules/ordenes/interfaces/IOrder';
import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { useForm } from 'react-hook-form';
import OrderItem from './OrderItem';
import Loader from '@/modules/common/components/Loader';
import useCreateTicketMutation from '@/modules/ordenes/hooks/useCreateTicketMutation';
import useCancelOrderMutation from '@/modules/ordenes/hooks/useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { useState } from 'react';
import ValidateCoupon from './ValidateCoupon';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HighlightedText from '@/modules/common/components/HighlightedText';
import usePrintService from '@/modules/common/hooks/usePrintService';
import Payments from './Payments';
import { IPromoItem } from '@/modules/cart/interfaces/ICart';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import useCreateTicketForm from '../hooks/useCreateTicketForm';

interface IProps {
  order: IOrder;
  updateMode?: boolean;
  handleToggleEdit: () => void;
}
interface IFormControl {
  additionalDetails: string;
  totalPrice: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  promoItems: IPromoItem[];
}

export const CreateTicketForm = ({
  order,
  updateMode,
  handleToggleEdit,
}: IProps) => {
  const {
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleCouponDiscountAmount,
    handleDeletePayment,
    payments,
    handleSubmit,
    handleSubmitCreateTicket,
    handleToggleAccordion,
    isCheckedAcordion,
    cancelOrderMutation,
    handleCancelOrder,
    createTicketMutation,
    finalTotalPrice,
    discountType,
    discountAmount,
    coupon,
    setDiscountAmount,
    setDiscountType,
  } = useCreateTicketForm({ order });
  return (
    <form
      className="flex w-full h-full justify-between bg-base-100 flex-col p-5 gap-5"
      onSubmit={handleSubmit(handleSubmitCreateTicket)}
    >
      <div className="flex flex-row gap-5">
        <div className="flex flex-col">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col">
              <p className="text-2xl font-bold">
                <ShoppingCartIcon className="w-5 inline" /> Orden # {order.id}{' '}
              </p>
              <p>
                <UserIcon className="w-5 inline" />{' '}
                {order.client?.name || 'Consumidor Final'}
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <button
                className="btn btn-secondary text-base-content"
                onClick={handleToggleEdit}
              >
                <PencilIcon className="w-full h-6 " />
              </button>

              <button
                disabled={cancelOrderMutation.isLoading}
                className="btn btn-error text-base-content"
                onClick={handleCancelOrder}
              >
                <TrashIcon className="w-full h-6 " />
              </button>
            </div>
          </div>
          <datalist className="flex flex-col gap-4">
            <p className="flex flex-row items-center gap-3 ">
              {' '}
              <CalendarDaysIcon className="w-5 inline text-neutral-focus" />{' '}
              {parseDateToArgentinianFormat(order.createdAt)}
            </p>
            {order.address ? (
              <p className="flex flex-row items-center gap-3 ">
                <MapPinIcon className="w-5 inline text-neutral-focus" />{' '}
                {order.address}
              </p>
            ) : null}
            {order.client?.phone_number ? (
              <p className="flex flex-row items-center gap-3">
                <DevicePhoneMobileIcon className="w-5 inline  text-neutral-focus" />{' '}
                {order.client?.phone_number}
              </p>
            ) : null}
            {order.additionalDetails && (
              <DataItem
                label="Observaciones:"
                value={order.additionalDetails}
                defaultValue=""
              />
            )}

            <div className="divider" />
          </datalist>
          <div className="flex flex-col gap-3">
            {order.items.map((item, itemIndex) => (
              <OrderItem updateMode={updateMode} key={itemIndex} item={item} />
            ))}
            {order.promoItems.map((promoItem, indexPromo) => (
              <RenderIf condition={promoItem.promo} key={indexPromo}>
                <div className="flex flex-col gap-2">
                  <div className="divider">Promo</div>
                  <p className="text-xl text-center">
                    ✨ {promoItem.promo?.name}
                  </p>
                  <HighlightedText>
                    {formatPrice(promoItem.promo.price)}
                  </HighlightedText>
                  {promoItem.selectedVariants?.map((v, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-4 gap-4 whitespace-nowrap justify-between text-sm"
                    >
                      <p>
                        {v.product.type.emoji} {v.product.name} -{' '}
                        <span>{v.name}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </RenderIf>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="divider">Pagos</div>
          <div className="flex flex-col gap-4">
            <DataItem
              label="Subtotal:"
              value={formatPrice(order.subtotalPrice)}
              defaultValue=""
            />
            <ValidateCoupon
              subtotalPrice={order.subtotalPrice}
              onChange={handleCouponDiscountAmount}
              coupon={coupon}
            />
            <DiscountTypeControl
              discountAmount={discountAmount}
              discountType={discountType}
              onChangeAmount={setDiscountAmount}
              onChangeType={setDiscountType}
            />
            <DataItem
              label="Total:"
              value={formatPrice(finalTotalPrice)}
              defaultValue=""
              className="text-2xl"
            />
            <Payments
              newTotalPrice={finalTotalPrice!}
              onChange={handleChangePayment}
              onDelete={handleDeletePayment}
              onNewPayment={handleClickAddPaymentMethod}
              payments={payments}
            />
            <button
              type="submit"
              disabled={createTicketMutation.isLoading || updateMode}
              className="btn btn-success disabled:btn-disabled text-neutral-focus"
            >
              {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

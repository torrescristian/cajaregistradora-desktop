import {
  formatPrice,
  getErrorMessage,
  parseDateToArgentinianFormat,
} from '@/libs/utils';
import {
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { DataItem } from './DataItem';
import { RenderIf } from './RenderIf';
import { DISCOUNT_TYPE, IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import { Payments } from './Payments';
import { IPayment, PAYMENT_TYPE } from '@/interfaces/ITicket';
import { useForm } from 'react-hook-form';
import OrderItem from './OrderItem';
import Loader from './Loader';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { useState } from 'react';

interface IProps {
  order: IOrder;
  isEditing: boolean;
  handleToggleEdit: () => void;
}
interface IFormControl {
  additionalDetails: string;
  totalPrice: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  [PAYMENT_TYPE.CASH]: number;
  [PAYMENT_TYPE.CREDIT]: number;
  [PAYMENT_TYPE.DEBIT]: number;
}

export const CreateTicketForm = ({
  order,
  isEditing,
  handleToggleEdit,
}: IProps) => {
  const createTicketMutation = useCreateTicketMutation();
  const cancelOrderMutation = useCancelOrderMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    PAYMENT_TYPE.CASH,
  );

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id!);
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      additionalDetails: order.additionalDetails,
      discountAmount: order.discount?.amount || 0,
      discountType: order.discount?.type || DISCOUNT_TYPE.FIXED,
      totalPrice: order.totalPrice,
      [PAYMENT_TYPE.CASH]: 0,
      [PAYMENT_TYPE.CREDIT]: 0,
      [PAYMENT_TYPE.DEBIT]: 0,
    },
  });
  // METHODS

  const handleChangePaymentType = (_selectedPaymentType: PAYMENT_TYPE) => {
    setSelectedPaymentType(_selectedPaymentType);
  };

  const handleSubmitCreateTicket = () => {
    const payments: IPayment[] = [];

    if (selectedPaymentType) {
      payments.push({
        type: selectedPaymentType,
        amount: getValues(selectedPaymentType),
      });
    }

    createTicketMutation.mutate({
      order: order.id!,
      totalPrice: order.totalPrice,
      cashBalance: activeCashBalanceQuery.cashBalance?.id!,
      payments,
    });
  };

  function statusTraslate(orderStatus: ORDER_STATUS) {
    switch (orderStatus) {
      case ORDER_STATUS.PAID:
        return 'Pagado';
      case ORDER_STATUS.CANCELLED:
        return 'Cancelado';
      case ORDER_STATUS.PENDING:
        return 'Pendiente';
      default:
        return '';
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-5"
      onSubmit={handleSubmit(handleSubmitCreateTicket)}
    >
      <div className="flex flex-row justify-end gap-3">
        <button
          className="btn btn-secondary text-stone-50"
          onClick={handleToggleEdit}
        >
          <PencilIcon className="w-full h-6 " />
        </button>

        <button
          className="btn btn-error text-stone-50"
          onClick={handleCancelOrder}
        >
          <TrashIcon className="w-full h-6 " />
        </button>
      </div>

      <div className="flex flex-col">
        {createTicketMutation.isError ? (
          <div className="alert alert-error toast toast-center toast-top mt-10 w-fit">
            <p className="text-error-content">
              {getErrorMessage(createTicketMutation)}
            </p>
          </div>
        ) : null}
        <datalist className="flex flex-col gap-4">
          <p className="text-2xl font-bold">
            <ShoppingCartIcon className="w-5 inline" /> Orden # {order.id} |{' '}
            <UserIcon className="w-5 inline" /> {order.client?.name}
          </p>
          <div className="divider" />
          <p className="flex flex-row items-center gap-3 ">
            {' '}
            <CalendarDaysIcon className="w-5 inline text-stone-500" />{' '}
            {parseDateToArgentinianFormat(order.createdAt)}
          </p>
          {order.address ? (
            <p className="flex flex-row items-center gap-3 ">
              <MapPinIcon className="w-5 inline text-stone-500" />{' '}
              {order.address}
            </p>
          ) : null}
          {order.phoneNumber ? (
            <p className="flex flex-row items-center gap-3">
              <DevicePhoneMobileIcon className="w-5 inline  text-stone-500" />{' '}
              {order.phoneNumber}
            </p>
          ) : null}
          {order.additionalDetails && <p>{order.additionalDetails}</p>}

          <DataItem
            label="Subtotal:"
            value={formatPrice(order.subtotalPrice)}
            defaultValue=""
          />
          <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.FIXED}>
            <DataItem
              label="Descuento:"
              value={formatPrice(order.discount?.amount!)}
              defaultValue=""
            />
          </RenderIf>
          <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.PERC}>
            <DataItem
              label="Descuento:"
              value={order.discount?.amount! + '%'}
              defaultValue=""
            />
          </RenderIf>

          <DataItem
            label="Pago:"
            value={statusTraslate(order.status)}
            defaultValue=""
          />
          <DataItem
            label="Total:"
            value={formatPrice(order.totalPrice)}
            defaultValue=""
            className="text-2xl"
          />
          <div className="divider" />
        </datalist>
        <div className="flex flex-col p-5 overflow-y-auto ">
          {order.items.map((item) => (
            <OrderItem
              isEditing={isEditing}
              key={item.product!.id}
              item={item}
            />
          ))}
        </div>
        <div className="divider"></div>
        <div className="flex flex-col gap-4">
          <Payments
            onChangeType={handleChangePaymentType}
            register={register}
          />
          <button
            type="submit"
            disabled={createTicketMutation.isLoading || isEditing}
            className="btn btn-success disabled:btn-disabled text-stone-50"
          >
            {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
          </button>
        </div>
      </div>
    </form>
  );
};

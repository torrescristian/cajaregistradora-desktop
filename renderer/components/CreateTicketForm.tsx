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
import { DISCOUNT_TYPE, IOrder } from '@/interfaces/IOrder';
import { IPayment, PAYMENT_TYPE } from '@/interfaces/ITicket';
import { useForm } from 'react-hook-form';
import OrderItem from './OrderItem';
import Loader from './Loader';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { useState } from 'react';
import Payments from './Payments';

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
}

export const CreateTicketForm = ({
  order,
  updateMode,
  handleToggleEdit,
}: IProps) => {
  const createTicketMutation = useCreateTicketMutation();
  const cancelOrderMutation = useCancelOrderMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();
  const [payments, setPayments] = useState<IPayment[]>([]);

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id!);
  };

  const handleChangePayments = (newPayments: IPayment[]) => {
    setPayments(newPayments);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      additionalDetails: order.additionalDetails,
      discountAmount: order.discount?.amount || 0,
      discountType: order.discount?.type || DISCOUNT_TYPE.FIXED,
      totalPrice: order.totalPrice,
    },
  });

  const handleSubmitCreateTicket = () => {
    createTicketMutation.mutate({
      order: order.id!,
      totalPrice: order.totalPrice,
      cashBalance: activeCashBalanceQuery.cashBalance?.id!,
      payments,
    });
  };

  return (
    <form
      className="flex w-full h-full flex-col gap-5"
      onSubmit={handleSubmit(handleSubmitCreateTicket)}
    >
      <div className="flex flex-row justify-between gap-3">
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
          {order.additionalDetails && (
            <DataItem
              label="Observaciones:"
              value={order.additionalDetails}
              defaultValue=""
            />
          )}

          <div className="divider" />
        </datalist>
        <div className="flex flex-col p-5 overflow-y-scroll h-44">
          {order.items.map((item) => (
            <OrderItem
              updateMode={updateMode}
              key={item.selectedVariant!.id}
              item={item}
            />
          ))}
        </div>
        <div className="divider">Pagos</div>
        <div className="flex flex-col gap-4">
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
          <RenderIf condition={!order.discount}>
            <DataItem
              label="Descuento:"
              value=""
              defaultValue={formatPrice(0)}
            />
          </RenderIf>
          <DataItem
            label="Total:"
            value={formatPrice(order.totalPrice)}
            defaultValue=""
            className="text-2xl"
          />
          <Payments onChange={handleChangePayments} />
          <button
            type="submit"
            disabled={createTicketMutation.isLoading || updateMode}
            className="btn btn-success disabled:btn-disabled text-stone-50"
          >
            {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
          </button>
        </div>
      </div>
    </form>
  );
};

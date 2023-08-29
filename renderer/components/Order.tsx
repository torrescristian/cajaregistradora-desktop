import { formatPrice, parseDateToArgentinianFormat } from '@/libs/utils';
import { DISCOUNT_TYPE, IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import OrderItem from './OrderItem';
import { useState } from 'react';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import Loader from './Loader';
import {
  CalendarDaysIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import FormFieldText from './FormFieldText';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';
import SelectClient from './SelectClient';
import IClient from '@/interfaces/IClient';
import useUpdateOrderMutation from '@/hooks/services/useUpdateOrderMutation';
import { DataItem } from './DataItem';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { DiscountTypeControl } from './DiscountTypeControl';
import { RenderIf } from './RenderIf';
import { Payments } from './Payments';
import { IPayment, PAYMENT_TYPE } from '@/interfaces/ITicket';

interface IProps {
  order: IOrder;
}
interface IFormControl {
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  additionalDetails: string;
  totalPrice: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  payments: IPayment[];
  [PAYMENT_TYPE.CASH]: number,
  [PAYMENT_TYPE.CREDIT]: number,
  [PAYMENT_TYPE.DEBIT]: number,
}

function Order({ order }: IProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      clientAddress: order.address,
      clientPhone: order.phoneNumber,
      additionalDetails: order.additionalDetails,
      totalPrice: order.totalPrice,
      discountAmount: order.discount?.amount || 0,
      discountType: order.discount?.type || DISCOUNT_TYPE.FIXED,
      [PAYMENT_TYPE.CASH]: 0,
      [PAYMENT_TYPE.CREDIT]: 0,
      [PAYMENT_TYPE.DEBIT]: 0,
    },
  });

  // STATE

  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState(PAYMENT_TYPE.CASH);

  //HOOKS
  const updateOrderMutation = useUpdateOrderMutation()
  const cancelOrderMutation = useCancelOrderMutation();
  const createTicketMutation = useCreateTicketMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();

  // METHODS

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitOrderConfirm = () => {
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
  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id!);
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


  const handleSubmitOrderUpdate = (data: IFormControl) => {
    updateOrderMutation.mutate({
      order: {
        id: order.id!,
        client: selectedClient?.id || order.client?.id,
        status: order.status,
        additionalDetails: data.additionalDetails,
        totalPrice: order.items.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0),
        items: order.items,
        address: data.clientAddress,
        phoneNumber: data.clientPhone,
        discount: {
          amount: data.discountAmount,
          type: data.discountType,
        },
      },
    })
  }
  const handleChangePaymentType = (_selectedPaymentType: PAYMENT_TYPE) => {
    setSelectedPaymentType(_selectedPaymentType)
  }

  const calcTotalDiscount = () => {

    if (!order.discount) {
      return order.totalPrice
    }

    if (order.discount.type === DISCOUNT_TYPE.FIXED) {
      return order.totalPrice - order.discount.amount
    }
    return order.totalPrice * (1 - order.discount.amount / 100)

  }

  // CONDITIONALS

  if (createTicketMutation.isLoading) {
    return <Loader />;
  }

  if (createTicketMutation.isError) {
    return <p>Error</p>;
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitOrderUpdate)}
      className=" shadow-xl w-full justify-between p-10 flex flex-row"
    >
      <section className="flex flex-col w-max gap-5 justify-between">
        {isEditing ? (
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Orden # {order.id} -</p>
            <SelectClient selectedClientId={order.client?.id || 0} onChange={(client) => {
              console.log({ client })
              setSelectedClient(client)
            }}
            />
            <>
              <FormFieldText
                register={register}
                label={'Direccion:'}
                formKey={'clientAddress'}
                errors={errors}
                symbol={'🏠'}
                labelRight
              />
              <FormFieldText
                register={register}
                label={'Telefono:'}
                formKey={'clientPhone'}
                errors={errors}
                symbol={'📲'}
                labelRight
              />
            </>

            <FormFieldText
              register={register}
              label={'Detalles adicionales:'}
              formKey="additionalDetails"
              errors={errors}
              symbol={'📝'}
              labelRight
            />
            <p>SubTotal: ${order.totalPrice}</p>
            <DiscountTypeControl errors={errors} register={register} onChange={
              (discountType) => setValue('discountType', discountType)}
            />
            <p>pago: {statusTraslate(order.status)}</p>
            <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="text-xl font-bold">Total:${order.totalPrice}</p>
          </div>
        ) : (
          <datalist className="flex flex-col gap-4">
            <p className="text-2xl font-bold">
              <ShoppingCartIcon className="w-5 inline" /> Orden # {order.id} |{' '}
              <UserIcon className="w-5 inline" /> {order.client?.name}
            </p>
            <div className='divider' />
            <p className="flex flex-row items-center gap-3 text-stone-500" >
              {' '}
              <CalendarDaysIcon className="w-5 inline" />{' '}
              {parseDateToArgentinianFormat(order.createdAt)}
            </p>
            {order.address ? <p className="flex flex-row items-center gap-3">
              <MapPinIcon className="w-5 inline" /> {order.address}
            </p> : null
            }
            {
              order.phoneNumber ? <p className="flex flex-row items-center gap-3">
                <DevicePhoneMobileIcon className="w-5 inline" />{' '}
                {order.phoneNumber}
              </p> : null
            }
            {order.additionalDetails && <p>{order.additionalDetails}</p>}

            <DataItem
              label='Subtotal:'
              value={formatPrice(order.totalPrice)}
              defaultValue=''
            />
            <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.FIXED}>
              <DataItem
                label='Descuento:'
                value={formatPrice(order.discount?.amount!)}
                defaultValue=''
              />
            </RenderIf>
            <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.PERC}>
              <DataItem
                label='Descuento:'
                value={order.discount?.amount! + '%'}
                defaultValue=''
              />
            </RenderIf>

            <DataItem
              label='Pago:'
              value={statusTraslate(order.status)}
              defaultValue=''
            />
            <div className='divider' />
            <DataItem
              label='Total:'
              value={formatPrice(calcTotalDiscount())}
              defaultValue=''
              className='text-2xl'
            />
          </datalist>
        )}
      </section>
      <section className="flex flex-col ">
        <div className="flex flex-row gap-5 justify-end">
          {isEditing ? (
            <button className='btn btn-success text-stone-50' onClick={handleToggleEdit} type='submit'>
              <CheckIcon className="w-full h-6" />
            </button>
          ) : (
            <button className='btn btn-secondary text-stone-50' onClick={handleToggleEdit}>
              <PencilIcon className="w-full h-6 " />
            </button>
          )}
          <button
            className="btn btn-error text-stone-50"
            onClick={handleCancelOrder}
          >
            <TrashIcon className="w-full h-6 " />
          </button>
        </div>
        <div className="flex flex-col p-5 overflow-y-auto ">
          {order.items.map((item) => (
            <OrderItem
              isEditing={isEditing}
              key={item.product!.id}
              item={item}
            />
          ))}
        </div>
        <button
          onClick={handleSubmitOrderConfirm}
          disabled={createTicketMutation.isLoading || isEditing}
          className="btn btn-success disabled:btn-disabled text-stone-50"
        >
          {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
        </button>
        <Payments onChangeType={handleChangePaymentType} register={register} />
      </section>
    </form >
  );
}

export default Order;

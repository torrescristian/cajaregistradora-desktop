import { formatPrice, parseDateToArgentinianFormat } from '@/libs/utils';
import { IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
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
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import FormFieldText from './FormFieldText';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';
import SelectClient from './SelectClient';
import IClient from '@/interfaces/IClient';
import useUpdateOrderMutation from '@/hooks/services/useUpdateOrderMutation';
import { DataItem } from './DataItem';

interface IProps {
  order: IOrder;
}
interface IFormControl {
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  additionalDetails: string;
  totalPrice: number;
}

function Order({ order }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      clientAddress: order.address,
      clientPhone: order.phone_number,
      additionalDetails: order.additional_details,
      totalPrice: order.total_price,
    },
  });

  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };


  const updateOrderMutation = useUpdateOrderMutation()
  const cancelOrderMutation = useCancelOrderMutation();
  const createTicketMutation = useCreateTicketMutation();

  const handleSubmitOrderConfirm = () => {
    createTicketMutation.mutate({
      order: order.id!,
      total_price: order.total_price,

    });
  };
  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id!);
  };


  if (createTicketMutation.isLoading) {
    return <Loader />;
  }

  if (createTicketMutation.isError) {
    return <p>Error</p>;
  }

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
  function statusColor(orderStatus: ORDER_STATUS) {
    switch (orderStatus) {
      case ORDER_STATUS.PAID:
        return 'text-success';
      case ORDER_STATUS.CANCELLED:
        return 'text-error';
      case ORDER_STATUS.PENDING:
        return 'text-yellow-500';
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
        additional_details: data.additionalDetails,
        total_price: order.items.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0),
        items: order.items,
        address: data.clientAddress,
        phone_number: data.clientPhone,
      },
    })
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
            }
            }
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
            <p>SubTotal: ${order.total_price}</p>
            <FormFieldText
              register={register}
              label={'Descuento:'}
              formKey="discount"
              errors={errors}
              symbol={'🎫'}
              labelRight
            />
            <p>pago: {statusTraslate(order.status)}</p>
            <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="text-xl font-bold">Total:${order.total_price}</p>
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
              order.phone_number ? <p className="flex flex-row items-center gap-3">
                <DevicePhoneMobileIcon className="w-5 inline" />{' '}
                {order.phone_number}
              </p> : null
            }
            {order.additional_details && <p>{order.additional_details}</p>}
            
            <DataItem
              label='Subtotal:'
              value={formatPrice(order.total_price)}
              defaultValue=''
            />
            {/* FIXME: replace value with variable */}
            <DataItem
              label='Descuento:'
              value={formatPrice(1000)}
              defaultValue=''
            />
            <DataItem
              label='Pago:'
              value={statusTraslate(order.status)}
              defaultValue=''
            />
            <div className='divider' />
            <DataItem
              label='Total:'
              value={formatPrice(order.total_price)}
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
          disabled={createTicketMutation.isLoading}
          className="btn btn-success disabled:btn-disabled text-stone-50"
        >
          {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
        </button>
      </section>
    </form >
  );
}

export default Order;

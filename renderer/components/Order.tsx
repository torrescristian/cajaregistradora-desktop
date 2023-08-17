import { parseDateToArgentinianFormat } from '@/libs/utils';
import { IOrderUI, ORDER_STATUS } from '@/interfaces/IOrder';
import OrderItem from './OrderItem';
import { useState } from 'react';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import Loader from './Loader';
import { CalendarDaysIcon, CheckIcon, DevicePhoneMobileIcon, MapPinIcon, PencilIcon, ShoppingCartIcon, TrashIcon, UserIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import FormFieldText from './FormFieldText';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';

interface IProps {
  order: IOrderUI;
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
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      clientName: order.clientName,
      clientAddress: order.clientAddress,
      clientPhone: order.clientPhone,
      additionalDetails: order.additionalDetails,
      totalPrice: order.totalPrice,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const cancelOrderMutation = useCancelOrderMutation();
  const createTicketMutation = useCreateTicketMutation();

  const handleSubmit = () => {
    createTicketMutation.mutate({
      order: order.id!,
      total_price: order.totalPrice,
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



  return (
    <div
      key={order.id}
      className=" shadow-xl w-full justify-between p-10 flex flex-row"
    >
      <div className="flex flex-col w-max gap-5 justify-between">
        {isEditing ? (
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Orden # {order.id} -</p>
            <FormFieldText
              register={register}
              label={'Cliente:'}
              formKey="clientName"
              errors={errors}
              symbol={'👤'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Direccion:'}
              formKey="clientAddress"
              errors={errors}
              symbol={'🏠'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Telefono:'}
              formKey="clientPhone"
              errors={errors}
              symbol={'📲'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Detalles adicionales:'}
              formKey="additionalDetails"
              errors={errors}
              symbol={'📝'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Subtotal:'}
              formKey="totalPrice"
              errors={errors}
              symbol={'💰'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Descuento:'}
              formKey="discount"
              errors={errors}
              symbol={'🎫'}
              labelRight
            />
            <p>pago: {order.status}</p>
            <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="text-xl font-bold">Total:${order.totalPrice}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">
              <ShoppingCartIcon className='w-5 inline' /> Orden # {order.id} | <UserIcon className='w-5 inline' /> {order.clientName}
            </p>
            <p className='flex flex-row items-center gap-3'> <CalendarDaysIcon className='w-5 inline' /> {parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="flex flex-row items-center gap-3"><MapPinIcon className='w-5 inline' /> {order.clientAddress}</p>
            <p className='flex flex-row items-center gap-3'><DevicePhoneMobileIcon className='w-5 inline' /> {order.clientPhone}</p>
            {order.additionalDetails && <p>{order.additionalDetails}</p>}
            <p>SubTotal: {' '}
              <span className='text-green-600'>
                ${order.totalPrice}
              </span>
            </p>
            <p>Descuento: {'  '}
              <span className='text-red-600'>
                $1000
              </span>
              
            </p>
            <p>pago: {' '}
            <span className={twMerge(statusColor(order.status))}>
            {statusTraslate(order.status)}
            </span>
            </p>
            <p className="text-xl font-bold">Total: ${order.totalPrice}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row gap-5 justify-end">
          <button
            className={twMerge(
              'btn text-stone-50',
              isEditing ? 'btn-success' : 'btn-secondary',
            )}
            onClick={handleToggleEdit}
          >
            {isEditing ? (
              <CheckIcon className="w-full h-6" />
            ) : (
              <PencilIcon className="w-full h-6 " />
            )}
          </button>
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
          onClick={handleSubmit}
          disabled={createTicketMutation.isLoading}
          className="btn btn-success disabled:btn-disabled text-stone-50"
        >
          {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
        </button>
      </div>
    </div>
  );
}

export default Order;

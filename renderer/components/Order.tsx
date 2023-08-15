import { parseDateToArgentinianFormat } from '@/libs/utils';
import { IOrderUI } from '@/interfaces/IOrder';
import OrderItem from './OrderItem';
import { useState } from 'react';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import Loader from './Loader';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import FormFieldText from './FormFieldText';

interface IProps {
  order: IOrderUI
}
interface IFormControl {
  clientName: string,
  clientAddress: string,
  clientPhone: string,
  additionalDetails: string,
  totalPrice: number,
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
    }
  })

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  }


  const createTicketMutation = useCreateTicketMutation();

  const handleSubmit = () => {
    createTicketMutation.mutate(
      {
        order: order.id!,
        total_price: order.totalPrice
      })

  }

  if (createTicketMutation.isLoading) {
    return <Loader />
  }

  if (createTicketMutation.isError) {
    return <p>Error</p>
  }

  return (
    <div
      key={order.id}
      className=" shadow-xl w-full justify-between p-10 flex flex-row"
    >
      <div className="flex flex-col w-max gap-5 justify-between">
        {isEditing ?
          <div className='flex flex-col gap-5'>
            <p className='font-bold text-2xl'>
              Orden # {order.id} -
            </p>
            <FormFieldText
              register={register}
              label={'Cliente:'}
              formKey='clientName'
              errors={errors}
              symbol={'👤'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Direccion:'}
              formKey='clientAddress'
              errors={errors}
              symbol={'🏠'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Telefono:'}
              formKey='clientPhone'
              errors={errors}
              symbol={'📲'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Detalles adicionales:'}
              formKey='additionalDetails'
              errors={errors}
              symbol={'📝'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Subtotal:'}
              formKey='totalPrice'
              errors={errors}
              symbol={'💰'}
              labelRight
            />
            <FormFieldText
              register={register}
              label={'Descuento:'}
              formKey='discount'
              errors={errors}
              symbol={'🎫'}
              labelRight
            />
            <p>pago: {order.status}</p>
            <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="text-xl font-bold">Total:${order.totalPrice}</p>
          </div>
          :
          <div className='flex flex-col gap-4'>
            <p className="text-2xl font-bold">
              Orden # {order.id} - Cliente: {order.clientName}
            </p>
            <p className="text-xl">Direccion: {order.clientAddress}</p>
            <p>Telefono: {order.clientPhone}</p>
            <p>{order.additionalDetails}</p>
            <p>SubTotal: ${order.totalPrice}</p>
            <p>Descuento: $-1000</p>
            <p>pago: {order.status}</p>
            <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
            <p className="text-xl font-bold">Total:${order.totalPrice}</p>
          </div>
        }
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row gap-5 justify-end">
          <button
            className={twMerge("btn text-stone-50", isEditing ? 'btn-success' : 'btn-secondary')}
            onClick={handleToggleEdit}
          >
            {isEditing ? <CheckIcon className='w-full h-6' /> : <PencilIcon className='w-full h-6 ' />}

          </button>
          <button className="btn btn-error text-stone-50">
            <TrashIcon className='w-full h-6 ' />
          </button>
        </div>
        <div className="flex flex-col p-5 overflow-y-auto ">
          {order.items.map((item) => (
            <OrderItem isEditing={isEditing} key={item.product!.id} item={item} />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={createTicketMutation.isLoading}
          className="btn btn-success disabled:btn-disabled text-stone-50">
          {createTicketMutation.isLoading ?
            (<Loader />)
            :
            'Confirmar orden'}
        </button>
      </div>
    </div>


  );
}

export default Order;

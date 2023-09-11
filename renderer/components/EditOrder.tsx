import { DISCOUNT_TYPE, IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import { DiscountTypeControl } from './DiscountTypeControl';
import FormFieldText from './FormFieldText';
import SelectClient from './SelectClient';
import {
  calcDiscount,
  formatPrice,
  getErrorMessage,
  parseDateToArgentinianFormat,
} from '@/libs/utils';
import { CheckIcon } from '@heroicons/react/24/solid';
import * as yup from 'yup';
import { PAYMENT_TYPE } from '@/interfaces/ITicket';
import useUpdateOrderMutation from '@/hooks/services/useUpdateOrderMutation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import IClient from '@/interfaces/IClient';
import { yupResolver } from '@hookform/resolvers/yup';

interface IProps {
  order: IOrder;
  setIsEditing: (isEditing: boolean) => void;
}

interface IFormControl {
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  additionalDetails: string;
  totalPrice: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  [PAYMENT_TYPE.CASH]: number;
  [PAYMENT_TYPE.CREDIT]: number;
  [PAYMENT_TYPE.DEBIT]: number;
}

export const EditOrder = ({ order, setIsEditing }: IProps) => {
  //STATE
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  const updateOrderMutation = useUpdateOrderMutation();

  const schema = yup
    .object({
      clientName: yup.string().optional(),
      clientAddress: yup.string().optional(),
      clientPhone: yup.string().optional(),
      additionalDetails: yup.string(),
      totalPrice: yup.number().positive(),
      discountAmount: yup.number().min(0),
      discountType: yup.string().optional(),
      [PAYMENT_TYPE.CASH]: yup.number().positive(),
      [PAYMENT_TYPE.CREDIT]: yup.number().positive(),
      [PAYMENT_TYPE.DEBIT]: yup.number().positive(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormControl>({
    // @ts-ignore
    resolver: yupResolver<IFormControl>(schema),
    defaultValues: {
      clientAddress: order.address || '',
      clientPhone: order.phoneNumber || '',
      additionalDetails: order.additionalDetails,
      totalPrice: order.totalPrice,
      discountAmount: order.discount?.amount || 0,
    },
  });

  const handleSubmitOrderUpdate = async (data: IFormControl) => {
    console.log('🔥');
    const subTotal = order.items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
    await updateOrderMutation.mutate({
      order: {
        id: order.id!,

        status: order.status,
        additionalDetails: data.additionalDetails,
        totalPrice: calcDiscount({
          price: subTotal,
          discountAmount: data.discountAmount,
          discountType: data.discountType,
        }),
        items: order.items,
        address: data.clientAddress,
        phoneNumber: data.clientPhone,
        discount: {
          amount: data.discountAmount,
          type: data.discountType,
        },
        subtotalPrice: subTotal,
      },
    });
    setIsEditing(false);
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
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleSubmitOrderUpdate)}
    >
      {updateOrderMutation.isError ? (
        <div className="alert alert-error toast toast-center toast-top mt-10 w-fit">
          <p className="text-error-content">
            {getErrorMessage(updateOrderMutation)}
          </p>
        </div>
      ) : null}
       <button className="btn btn-success text-stone-50" type="submit">
        <CheckIcon className="w-full h-6" />
      </button>
     <p className="font-bold text-2xl">Orden # {order.id} -</p>
      <SelectClient
        selectedClientId={order.client?.id || 0}
        onChange={(client) => {
          console.log({ client });
          setSelectedClient(client);
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
      <p>SubTotal: {formatPrice(order.subtotalPrice)}</p>
      <DiscountTypeControl
        errors={errors}
        register={register}
        onChange={(discountType) => setValue('discountType', discountType)}
      />
      <p>pago: {statusTraslate(order.status)}</p>
      <p>{parseDateToArgentinianFormat(order.createdAt)}</p>
      <p className="text-xl font-bold">
        Total: {formatPrice(order.totalPrice)}
      </p>
    </form>
  );
};

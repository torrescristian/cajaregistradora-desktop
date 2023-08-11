import { parseDateToArgentinianFormat } from '@/libs/utils';
import { IOrderUI } from '@/interfaces/IOrder';
import OrderItem from './OrderItem';
import { useState } from 'react';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import Loader from './Loader';

interface IProps{
  order : IOrderUI
}

function Order({order}: IProps) {

  const [edit, setEdit] = useState(false);

  const createTicketMutation = useCreateTicketMutation();

  const handleSubmit = () => {
    createTicketMutation.mutate(
      {
        order: order.id! ,
        total_price: order.totalPrice
       })
    
  }


  return (
        <div
          key={order.id}
          className=" shadow-xl w-full justify-between p-10 flex flex-row"
        >
          <div className="flex flex-col w-max gap-5 justify-between">
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
          <div className="flex flex-col justify-between">
            <div className="flex flex-row gap-5 justify-end">
              <button className="btn btn-secondary text-stone-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
              <button className="btn btn-error text-stone-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col p-5">
              {order.items.map((item) => (
                <OrderItem key={item.product!.id} item={item}  />
              ))}
            </div>
            <button
            onClick={handleSubmit}
            disabled={createTicketMutation.isLoading} 
            className="btn btn-success disabled:btn-disabled text-stone-50">
              {createTicketMutation.isLoading ?
              (<Loader/>)
              :
              'Confirmar orden'}
            </button>
          </div>
        </div>

  );
}

export default Order;

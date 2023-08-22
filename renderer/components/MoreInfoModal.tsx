import { useRef } from 'react';
import OrderItem from './OrderItem';
import { ITicket } from '@/interfaces/ITicket';
import { twMerge } from 'tailwind-merge';
import { DataItem } from './DataItem';



interface IMoreInfoModal {
  ticket: ITicket;
}
export const MoreInfoModal = ({ ticket }: IMoreInfoModal) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickMoreInfo = () => {
    ref.current?.showModal();
  };
  return (
    <>
      <button className="btn" onClick={() => handleClickMoreInfo()}>
        Más info
      </button>
      <dialog ref={ref} className="bg-transparent p-10">
        <form method="dialog" className="modal-box gap-10">
          <dl className="flex flex-col gap-5 ">
            <div className='divider'>

              <DataItem
                label='Ticket #'
                value={String(ticket.id)}
                defaultValue=''
              />
            </div>
            <DataItem
              label="Cliente:"
              value={ticket.order.client?.name}
              defaultValue='Consumidor final'
            />
            <DataItem
              label="Dirección:"
              value={ticket.order.address}
              defaultValue='Sin dirección'
            />
            <DataItem
              label="Teléfono:"
              value={ticket.order.phone_number}
              defaultValue='Sin teléfono'
            />
            <div className='divider text-stone-500'>Productos</div>
          </dl>
          <div className="flex flex-col p-5">
            {ticket.order.items.map((item) => (
              <OrderItem isEditing={false} key={item.product!.id} item={item} />
            ))}
          </div>
          <div className="modal-action">
            <button className="btn">Cerrar</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

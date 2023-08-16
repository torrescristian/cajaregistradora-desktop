import Loader from '@/components/Loader';
import OrderItem from '@/components/OrderItem';
import PageLayout from '@/components/PageLayout';
import useTicketQuery from '@/hooks/services/useTicketQuery';
import { IOrder } from '@/interfaces/IOrder';
import { TICKET_STATUS } from '@/interfaces/ITicket';
import { parseDateToArgentinianFormat } from '@/libs/utils';
import {  TrashIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Ventas = () => {
  /*  
    return (
      <PageLayout className="w-screen">
        <h1 className="bold text-2xl">📊 últimas ventas</h1>
        <p>Encontrá acá tus ventas más recientes</p>
        <InfiniteScroll
          dataLength={salesQuery.sales.length || 0}
          next={() => salesQuery.fetchNextPage()}
          hasMore={!!salesQuery.hasNextPage}
          loader={<Loader />}
        >
          <section className="grid grid-cols-3 gap-5">
            {salesQuery.sales.map((sale) => {
              return <Sale sale={sale} key={sale.id} />;
            })}
          </section>
        </InfiniteScroll>
      </PageLayout>
    ); */

  const ref = useRef<HTMLDialogElement>(null);

  const [selectedOrder, setSelectOrder] = useState<IOrder | null>(null);

  const handleClickMoreInfo = (order: IOrder) => () => {
    setSelectOrder(order);
    ref.current?.showModal()
  }

  function statusTraslate(ticketStatus: TICKET_STATUS) {
    switch (ticketStatus) {
      case TICKET_STATUS.PAID:
        return 'Pagado'
      case TICKET_STATUS.REFUNDED:
        return 'Reembolsado'
      case TICKET_STATUS.WAITING_FOR_REFUND:
        return 'Esperando reembolso'
      default:
        return ''
    }

  }
  function statusColor(ticketStatus: TICKET_STATUS) {
    switch (ticketStatus) {
      case TICKET_STATUS.PAID:
        return 'text-success'
      case TICKET_STATUS.REFUNDED:
        return 'text-error'
      case TICKET_STATUS.WAITING_FOR_REFUND:
        return 'text-warning'
      default:
        return ''
    }

  }


  const ticketQuery = useTicketQuery();
  if (ticketQuery.isLoading)
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    )
  if (ticketQuery.isError)
    return (
      <PageLayout>
        <p>Error</p>
      </PageLayout>
    );

  return (
    <PageLayout className='grid grid-cols-3 w-fit gap-5 justify-center '>
      {ticketQuery.data.map((ticket) =>
        <div key={ticket.id} className='flex flex-col w-max gap-5 p-10 shadow-xl '>
          <div className='flex flex-row justify-between items-center w-full'>
            <p className='font-bold text-xl'>Ticket #{ticket.id}</p>
            <button className='btn w-min btn-error'>
              <TrashIcon className='h-5 text-white' />
            </button>
          </div>
          <p>Fecha: {parseDateToArgentinianFormat(ticket.order.createdAt)}</p>
          <p>Estado:{' '}
            <span className={twMerge(statusColor(ticket.status))}>
              {statusTraslate(
                ticket.status
              )}</span>
          </p>
          <p>Total: ${ticket.total_price}</p>
          <button className="btn" onClick={handleClickMoreInfo(ticket.order)}>Más info</button>
        </div>
      )}
      <dialog ref={ref} className="bg-transparent p-10">
        <form method="dialog" className="modal-box gap-10">
          <div className='flex flex-col gap-5 '>
            <h3 className="font-bold text-lg">Cliente: {selectedOrder?.client.name}</h3>
            <p>Direccion: {selectedOrder?.client.address}</p>
            <p>Telefono: {selectedOrder?.client.phone_number}</p>
            <h3 className='text-2xl font-bold'>Productos:</h3>
          </div>
          <div className="flex flex-col p-5">
            {selectedOrder?.items.map((item) => (
              <OrderItem isEditing={false} key={item.product!.id} item={item} />
            ))}
          </div>
          <div className="modal-action">
            <button className="btn" >Cerrar</button>
          </div>
        </form>
      </dialog>
    </PageLayout>

  )
};

export default Ventas;

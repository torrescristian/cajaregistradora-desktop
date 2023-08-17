import { DeleteTicketModal } from '@/components/DeleteTicketModal';
import Loader from '@/components/Loader';
import { MoreInfoModal } from '@/components/MoreInfoModal';
import PageLayout from '@/components/PageLayout';
import useTicketQuery from '@/hooks/services/useTicketQuery';
import { TICKET_STATUS } from '@/interfaces/ITicket';
import { parseDateToArgentinianFormat } from '@/libs/utils';
import { twMerge } from 'tailwind-merge';

const Ventas = () => {


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
            <DeleteTicketModal ticket={ticket} />
          </div>
          <p>Fecha: {parseDateToArgentinianFormat(ticket.order.createdAt)}</p>
          <p>Estado:{' '}
            <span className={twMerge(statusColor(ticket.status))}>
              {ticket.status}</span>
          </p>
          <p>Total: ${ticket.total_price}</p>
          <MoreInfoModal ticket={ticket} />
        </div>
      )}
    </PageLayout>

  )
};

export default Ventas;

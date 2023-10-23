import Loader from '@/components/Loader';
import PageLayout from '@/components/PageLayout';
import { IColumn } from '@/components/TicketTable/interface';
import TicketTable from '@/components/TicketTable/TicketTable';
import useTicketQuery from '@/hooks/services/useTicketQuery';
import { IPayment, PAYMENT_TYPE, TICKET_STATUS } from '@/interfaces/ITicket';
import { parseDateToArgentinianFormat } from '@/libs/utils';

const Recibos = () => {
  function statusColor(ticketStatus: TICKET_STATUS) {
    switch (ticketStatus) {
      case TICKET_STATUS.PAID:
        return 'text-success';
      case TICKET_STATUS.REFUNDED:
        return 'text-error';
      case TICKET_STATUS.WAITING_FOR_REFUND:
        return 'text-warning';
      default:
        return '';
    }
  }

  function getLabelByPaymentsType(payments: IPayment[]) {
    if (payments.length > 1) {
      return 'Mixto';
    }
    const payment = payments[0];
    switch (payment.type) {
      case PAYMENT_TYPE.CASH:
        return 'Efectivo';
      case PAYMENT_TYPE.CREDIT:
        return 'Crédito';
      case PAYMENT_TYPE.DEBIT:
        return 'Débito';
      default:
        return '';
    }
  }

  const ticketQuery = useTicketQuery();
  if (ticketQuery.isLoading)
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );
  if (ticketQuery.isError)
    return (
      <PageLayout>
        <p>Error</p>
      </PageLayout>
    );

  const data = ticketQuery.data.map(
    (ticket) =>
      ({
        client: ticket.order?.client?.name,
        date: parseDateToArgentinianFormat(ticket.order?.createdAt),
        direction: ticket.order?.client?.address,
        state: ticket.status,
        ticket,
        subtotalPrice: ticket.order?.subtotalPrice,
        totalPrice: ticket.totalPrice,
        phone_number: ticket.order?.client?.phone_number,
        paymentType: getLabelByPaymentsType(ticket.payments),
      }) as IColumn,
  );

  return (
    <PageLayout className="grid grid-cols-3 w-fit gap-5 justify-center ">
      <TicketTable data={data} />
      {/* {ticketQuery.data.map((ticket) => (
        <div
          key={ticket.id}
          className="flex flex-col w-max gap-5 p-10 shadow-xl "
        >
          <div className="flex flex-row justify-between items-center w-full">
            <p className="font-bold text-xl">Ticket #{ticket.id}</p>
            <DeleteTicketModal ticket={ticket} />
          </div>
          <p>Fecha: {parseDateToArgentinianFormat(ticket.order.createdAt)}</p>
          <p>
            Estado:{' '}
            <span className={twMerge(statusColor(ticket.status))}>
              {statusTraslate(ticket.status)}
            </span>
          </p>
          <p>Total: {formatPrice(ticket.totalPrice)}</p>
          <MoreInfoModal ticket={ticket} />
        </div>
      ))} */}
    </PageLayout>
  );
};

export default Recibos;

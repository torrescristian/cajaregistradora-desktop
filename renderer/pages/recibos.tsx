import Loader from '@/components/Loader';
import PageLayout from '@/components/PageLayout';
import { IColumn } from '@/components/TicketTable/interface';
import TicketTable from '@/components/TicketTable/TicketTable';
import useTicketQuery from '@/hooks/services/useTicketQuery';
import { IPayment, PAYMENT_TYPE } from '@/interfaces/ITicket';
import { parseDateToArgentinianFormat } from '@/libs/utils';

const Recibos = () => {
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
    <PageLayout className="grid grid-cols-3 gap-5 justify-center overflow-x-scroll ">
      <TicketTable data={data} />
    </PageLayout>
  );
};

export default Recibos;

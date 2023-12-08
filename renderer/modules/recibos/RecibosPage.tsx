import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import useTicketQuery from './hooks/useTicketQuery';
import { parseDateToArgentinianFormat } from '@/modules/common/libs/utils';
import { IColumnTicket } from './interfaces/IColumnTicket';
import TicketTable from './components/TicketTable';
import Loader from '../common/components/Loader';
import PageLayout from '../common/components/PageLayout';
import NoMobileVersion from '../common/components/NoMobileVersion';

export default function RecibosPage() {
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
      }) as IColumnTicket,
  );

  return (
    <PageLayout className="gap-5 justify-center p-5  sm:mt-2 mt-20 overflow-x-scroll ">
      <NoMobileVersion />
      <TicketTable data={data} />
    </PageLayout>
  );
}

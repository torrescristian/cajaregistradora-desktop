import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import useTicketQuery from './hooks/useTicketQuery';
import {
  getLabelByPaymentsType,
  parseDateToArgentinianFormat,
} from '@/modules/common/libs/utils';
import { IColumnTicket } from './interfaces/IColumnTicket';
import TicketTable from './components/TicketTable';
import Loader from '../common/components/atoms/Loader';
import PageLayout from '../common/components/templates/PageLayout';
import NoMobileVersion from '../common/components/atoms/NoMobileVersion';
import {
  Pagination,
  usePagination,
} from '../common/components/molecules/Pagination';

export default function RecibosPage() {
  const paginationControls = usePagination();
  const ticketQuery = useTicketQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
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

  const data = ticketQuery.data.tickets.map(
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
      <Pagination {...paginationControls} />
    </PageLayout>
  );
}

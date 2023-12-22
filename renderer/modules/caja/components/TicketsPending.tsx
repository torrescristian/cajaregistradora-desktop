import { RenderIf } from '@/modules/common/components/RenderIf';
import TicketPendingTable from './TicketPedingTable';
import useTicketPendingQuery from '@/modules/recibos/hooks/useTicketPendingQuery';
import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import Loader from '@/modules/common/components/Loader';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';

export default function TicketsPending() {
  const paginationControls = useButtonPagination();

  const ticketPendingQuery = useTicketPendingQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const ticketPending = ticketPendingQuery.data?.tickets || [];

  if (ticketPendingQuery.isLoading) return <Loader />;
  const dataTicket = ticketPendingQuery.data?.tickets.map(
    (ticket) =>
      ({
        id: ticket.id,
        order: ticket.order,
        cashBalance: ticket.cashBalance,
        totalPrice: ticket.totalPrice,
        couponDiscount: ticket.couponDiscount,
        payments: ticket.payments,
        status: ticket.status,
      }) as ITicket,
  );

  return (
    <div className="flex flex-col w-full gap-10 justify-center">
      <RenderIf condition={ticketPending.length > 0}>
        <p className="text-xl text-center divider">Devoluciones Pendientes</p>
        <TicketPendingTable tickets={dataTicket!} />
        <ButtonPagination {...paginationControls} />
      </RenderIf>
    </div>
  );
}

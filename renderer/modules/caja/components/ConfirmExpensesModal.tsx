import React, { useRef } from 'react';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useTicketPendingQuery from '@/modules/recibos/hooks/useTicketPendingQuery';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import TicketPendingTable from './TicketPedingTable';
import Loader from '@/modules/common/components/Loader';
import { ITicket } from '@/modules/recibos/interfaces/ITicket';

export default function ConfirmExpensesModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const ticketPendingQuery = useTicketPendingQuery();
  const ticketPending = ticketPendingQuery.data || [];
  if (ticketPendingQuery.isLoading) return <Loader />;
  const data = ticketPendingQuery.data?.map(
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

  const { isOwner } = useAuthState();

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ref.current?.showModal();
  };
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ref.current?.close();
  };

  return (
    <div>
      <RenderIf condition={isOwner}>
        <RenderIf condition={ticketPending.length > 0}>
          <TicketPendingTable tickets={data!} />
        </RenderIf>
      </RenderIf>
    </div>
  );
}

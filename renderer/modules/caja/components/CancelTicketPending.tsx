import { DataItem } from '@/modules/common/components/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import useCancelTicketMutation from '@/modules/recibos/hooks/useCancelTicketMutation';
import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import { toast } from 'react-toastify';

interface IProps {
  ticket: ITicket;
}

export const CancelTicketPending = ({ ticket }: IProps) => {
  const cancelTicketMutation = useCancelTicketMutation();

  const handleConfirmCancelTicket =
    (returnType: 'cash' | 'other') => async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        await cancelTicketMutation.mutateAsync({
          ticketId: ticket.id!,
          order: ticket.order!,
          amountTicket: ticket.totalPrice,
          cashBalance: ticket.cashBalance,
          returnType,
        });
        toast.success('Reembolsado con exito');
      } catch (error) {
        toast.error(`No se logro reembolsar`);
      }
    };

  return (
    <form
      key={ticket.id}
      className="flex flex-col gap-5 border-2 border-neutral-content p-4"
    >
      <li>
        <DataItem defaultValue="" label="Numero de Ticket:" value={ticket.id} />
      </li>
      <li>
        {' '}
        <DataItem
          defaultValue=""
          label="Total a devolver:"
          value={formatPrice(ticket.totalPrice)}
        />
      </li>
      <li>
        <button
          className="btn btn-error"
          type="submit"
          onClick={handleConfirmCancelTicket('cash')}
        >
          Confimar cancelacion en efectivo
        </button>
      </li>
      <li>
        <button
          className="btn btn-error btn-link"
          onClick={handleConfirmCancelTicket('other')}
        >
          Confirmar cancelacion en otro medio de pago
        </button>
      </li>
    </form>
  );
};

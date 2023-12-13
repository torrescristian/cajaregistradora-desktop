import { DataItem } from '@/modules/common/components/DataItem';
import { formatPrice } from '@/modules/common/libs/utils';
import useCancelTicketMutation from '@/modules/recibos/hooks/useCancelTicketMutation';
import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  ticket: ITicket;
}

export const CancelTicketPending = ({ ticket }: IProps) => {
  const cancelTicketMutation = useCancelTicketMutation();

  const ref = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleConfirmCancelTicket =
    (returnType: 'cash' | 'other') => async (e: React.MouseEvent) => {
      e.preventDefault();
      console.log({ ticket, returnType });
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
    <section className="w-full flex justify-center">
      <button className="btn btn-error " onClick={handleOpenModal}>
        <TrashIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className="w-min">
        <form
          key={ticket.id}
          className="flex flex-col gap-5 border-2 border-neutral-content p-4"
        >
          <DataItem
            defaultValue=""
            label="Numero de Ticket:"
            value={ticket.id}
          />{' '}
          <DataItem
            defaultValue=""
            label="Total a Reembolsar:"
            value={formatPrice(ticket.totalPrice)}
          />
          <button
            className="btn btn-error"
            type="submit"
            onClick={handleConfirmCancelTicket('cash')}
          >
            Cancelar y Reembolsar en Efectivo
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirmCancelTicket('other')}
          >
            Cancelar y Reembolsar con Otro Medio de Pago
          </button>
          <button
            className="btn btn-error btn-link text-secondary-focus"
            onClick={handleCloseModal}
          >
            {' '}
            Cerrar sin Cancelar
          </button>
        </form>
      </dialog>
    </section>
  );
};

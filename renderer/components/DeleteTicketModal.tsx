import useCancelTicketMutation from '@/hooks/services/useCancelTicketMutation';
import { ITicket } from '@/interfaces/ITicket';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

interface IDeleteTicketModalProps {
  ticket: ITicket;
}

export const DeleteTicketModal = ({ ticket }: IDeleteTicketModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickDeleteTicket = () => {
    ref.current?.showModal();
  };
  const cancelTicketMutation = useCancelTicketMutation();

  const handleConfirmCancelTicket = () => {
    cancelTicketMutation.mutate({
      ticketId: ticket.id!,
      orderId: ticket.order.id!,
    });
  };

  return (
    <>
      <button
        className="btn w-min btn-error"
        onClick={() => handleClickDeleteTicket()}
      >
        <TrashIcon className="h-5 text-white" />
      </button>
      <dialog ref={ref} className="bg-transparent p-10">
        <form method="dialog" className="modal-box gap-10">
          <h3 className="font-bold text-lg">
            ¿Desea eliminar el ticket # {ticket.id}?
          </h3>
          <p>Total: ${ticket.total_price}</p>
          <p className="py-4">El ticket se va a eliminar permanentemente.</p>
          <div className="modal-action">
            <button
              className="btn text-neutral-800 btn-link no-underline "
              onClick={handleConfirmCancelTicket}
            >
              Eliminar
            </button>
            <button className="btn ">Mantener</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

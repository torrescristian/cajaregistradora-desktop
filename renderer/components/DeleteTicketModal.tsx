import useCancelTicketMutation from '@/hooks/services/useCancelTicketMutation';
import { ITicket, TICKET_STATUS } from '@/interfaces/ITicket';
import { formatPrice } from '@/libs/utils';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { DataItem } from './DataItem';
import { ToastContainer, toast } from 'react-toastify';

interface IDeleteTicketModalProps {
  ticket: ITicket;
}

export const DeleteTicketModal = ({ ticket }: IDeleteTicketModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickDeleteTicket = () => {
    ref.current?.showModal();
  };
  const cancelTicketMutation = useCancelTicketMutation();

  const handleConfirmCancelTicket = (returnType: 'cash' | 'other') =>async() => {
    try {
      await cancelTicketMutation.mutateAsync({
        ticketId: ticket.id!,
        orderId: ticket.order.id!,
        amountTicket: ticket.totalPrice,
        cashBalance: ticket.cashBalance,
        returnType,
      });
      toast.success('Reembolsado con exito')
    }
    catch (error) {
      toast.error(`No se logro reembolsar`)
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"></ToastContainer>
      <button
        className="btn w-min btn-error"
        onClick={() => handleClickDeleteTicket()}
        disabled={ticket.status === TICKET_STATUS.REFUNDED}
      >
        <TrashIcon className="h-5 text-white" />
      </button>
      <dialog ref={ref} className="bg-transparent p-10">
        <form method="dialog" className="modal-box gap-3 flex flex-col">
          <h3 className="font-bold text-lg">
            ¿Desea eliminar el ticket # {ticket.id}?
          </h3>
          <DataItem
            defaultValue=""
            label="Total:"
            value={formatPrice(ticket.totalPrice)}
          />
          <p className="text-stone-500">
            El ticket se va a eliminar permanentemente.
          </p>
          <div className="modal-action gap-5 flex flex-col">
            <button
              className="btn btn-error text-info-content"
              onClick={handleConfirmCancelTicket('cash')}
            >
              Reembolsar Efectivo
            </button>
            <button
              className="btn text-red-500 btn-link no-underline whitespace-nowrap"
              onClick={handleConfirmCancelTicket('other')}
            >
              Reembolsar otras formas de pago
            </button>
            <button className="btn ">Mantener</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

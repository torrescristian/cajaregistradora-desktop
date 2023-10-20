import useCancelTicketMutation from '@/hooks/services/useCancelTicketMutation';
import { ITicket, TICKET_STATUS } from '@/interfaces/ITicket';
import { formatPrice } from '@/libs/utils';
import { ReceiptRefundIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { DataItem } from './DataItem';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface IDeleteTicketModalProps {
  ticket: ITicket;
}

export const DeleteTicketModal = ({ ticket }: IDeleteTicketModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const disabled = ticket.status === TICKET_STATUS.REFUNDED;

  const handleClickDeleteTicket = () => {
    ref.current?.showModal();
  };
  const cancelTicketMutation = useCancelTicketMutation();

  const handleConfirmCancelTicket =
    (returnType: 'cash' | 'other') => async () => {
      try {
        await cancelTicketMutation.mutateAsync({
          ticketId: ticket.id!,
          orderId: ticket.order.id!,
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
    <>
      <button
        className="btn w-min btn-error"
        onClick={() => handleClickDeleteTicket()}
        disabled={disabled}
      >
        <ReceiptRefundIcon
          className={twMerge('h-5', disabled ? 'text-stone-500' : 'text-white')}
        />
      </button>
      <dialog ref={ref} className="bg-transparent p-10">
        <form method="dialog" className="modal-box gap-3 flex flex-col w-fit">
          <h3 className="font-bold text-lg">
            ¿Desea reembolsar la venta # {ticket.id}?
          </h3>
          <DataItem
            defaultValue=""
            label="Total a devolver:"
            value={formatPrice(ticket.totalPrice)}
          />
          <div className="modal-action gap-5 flex flex-col">
            <button
              className="btn btn-error text-info-content whitespace-nowrap"
              onClick={handleConfirmCancelTicket('other')}
            >
              Reembolsar otras formas de pago
            </button>
            <button
              className="btn text-red-500 btn-link no-underline"
              onClick={handleConfirmCancelTicket('cash')}
            >
              Reembolsar Efectivo
            </button>
            <button className="btn ">Mantener</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

import useCancelTicketMutation from '@/modules/recibos/hooks/useCancelTicketMutation';
import { ITicket, TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';
import { formatPrice } from '@/modules/common/libs/utils';
import { ClockIcon, ReceiptRefundIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { DataItem } from '../../common/components/DataItem';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { RenderIf } from '@/modules/common/components/RenderIf';

interface IDeleteTicketModalProps {
  ticket: ITicket;
}

export const DeleteTicketModal = ({ ticket }: IDeleteTicketModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const disabled = ticket.status === TICKET_STATUS.REFUNDED;
  const pending = ticket.status === TICKET_STATUS.WAITING_FOR_REFUND;
  const { isOwner } = useAuthState();
  const handleClickDeleteTicket = () => {
    ref.current?.showModal();
  };
  const cancelTicketMutation = useCancelTicketMutation();

  const handleConfirmCancelTicket =
    (returnType: 'cash' | 'other') => async () => {
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
    <>
      <button
        className={twMerge(pending ? 'btn-primary' : 'btn-error', 'btn w-min ')}
        onClick={() => handleClickDeleteTicket()}
        disabled={disabled}
      >
        {pending ? (
          <ClockIcon className="w-5 h-5" />
        ) : (
          <ReceiptRefundIcon
            className={twMerge(
              'h-5',
              disabled ? 'text-text-base-content' : 'text-white',
            )}
          />
        )}
      </button>
      <dialog ref={ref} className="bg-transparent p-10 w-[90vw] sm:w-min">
        <form method="dialog" className="modal-box gap-3 flex flex-col w-fit">
          <RenderIf condition={pending && !isOwner}>
            <p className="text-xl font-bold">Esperando al administrador ⏳</p>
            <button className="btn" onClick={(e) => ref.current?.close()}>
              Ok
            </button>
          </RenderIf>
          <RenderIf condition={!pending || isOwner}>
            <div>
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
                  {isOwner
                    ? 'Reembolsar en otras formas de pago'
                    : 'Notificar reembolso en otras formas de pago'}
                </button>
                <button
                  className="btn text-red-500 btn-link no-underline"
                  onClick={handleConfirmCancelTicket('cash')}
                >
                  {isOwner
                    ? 'Reembolsar en Efectivo'
                    : 'Notificar reembolso de efectivo'}
                </button>
                <button
                  className="btn text-red-500 btn-link no-underline"
                  onClick={handleConfirmCancelTicket('other')}
                >
                  {isOwner
                    ? 'Reembolsar otras formas de pago'
                    : 'Notificar reembolso en otras formas de pago'}
                </button>
                <button className="btn" onClick={(e) => ref.current?.close()}>
                  Mantener
                </button>
              </div>
            </div>
          </RenderIf>
        </form>
      </dialog>
    </>
  );
};

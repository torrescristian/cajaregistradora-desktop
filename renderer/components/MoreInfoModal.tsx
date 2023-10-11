import { useRef } from 'react';
import OrderItem from './OrderItem';
import { ITicket } from '@/interfaces/ITicket';
import { DataItem } from './DataItem';
import { getLabelByPaymentType } from './Payments/utils';
import { Divider } from './Sale/Sale.styles';
import { formatPrice } from '@/libs/utils';
import { RenderIf } from './RenderIf';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

interface IMoreInfoModal {
  ticket: ITicket;
}
export const MoreInfoModal = ({ ticket }: IMoreInfoModal) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClickMoreInfo = () => {
    ref.current?.showModal();
  };
  return (
    <>
      <button className="btn" onClick={() => handleClickMoreInfo()}>
        <InformationCircleIcon className="h-5" />
      </button>
      <dialog ref={ref} className="bg-transparent p-15 w-[40vw]">
        <form method="dialog" className="modal-box gap-10">
          <dl className="flex flex-col gap-5 ">
            <div className="divider">
              <DataItem
                label="Ticket #"
                value={String(ticket.id)}
                defaultValue=""
              />
            </div>
            <DataItem
              label="Cliente:"
              value={ticket.order.client?.name}
              defaultValue="Consumidor final"
            />
            <DataItem
              label="Dirección:"
              value={ticket.order.address}
              defaultValue="Sin dirección"
            />
            <DataItem
              label="Teléfono:"
              value={ticket.order.client?.phone_number}
              defaultValue="Sin teléfono"
            />
            <RenderIf condition={ticket.order.additionalDetails}>
              <DataItem
                label="detalles adicionales:"
                value={ticket.order.additionalDetails}
              />
            </RenderIf>
            <Divider className="text-stone-500">Metodos de pago</Divider>
            <DataItem
              label="Subtotal:"
              value={formatPrice(ticket.order.subtotalPrice)}
            />
            <RenderIf condition={ticket.order.coupon!}>
              <DataItem
                label="Nombre de cupon:"
                value={ticket.order.coupon?.code}
                defaultValue={ticket.order.coupon?.code}
              />
              <DataItem
                label="Descuento del cupon:"
                value={formatPrice(ticket.couponDiscount)}
                defaultValue={'$0.00'}
              />
            </RenderIf>
            <RenderIf condition={ticket.order.discount!}>
              <DataItem
                label="Otros descuentos:"
                value={formatPrice(ticket.order.discount?.amount!)}
              />
            </RenderIf>
            {ticket.payments.map((payment) => (
              <DataItem
                key={payment.type}
                label={getLabelByPaymentType(payment.type)}
                value={formatPrice(Number(payment.amount))}
                defaultValue={payment.type}
              />
            ))}
            <div className="divider text-stone-500">Productos</div>
          </dl>
          <div className="flex flex-col p-5 overflow-y-scroll">
            {ticket.order.items.map((item) => (
              <OrderItem
                updateMode={false}
                key={item.product!.id}
                item={item}
              />
            ))}
          </div>

          <div className="modal-action">
            <button className="btn">Cerrar</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

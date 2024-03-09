import { useRef } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

import { ITicket } from '@/modules/recibos/interfaces/ITicket';
import { DataItem } from '@/modules/common/components/DataItem';
import { discountToString, formatPrice } from '@/modules/common/libs/utils';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

import OrderItem from './molecules/OrderItem';
import { getLabelByPaymentType } from '../utils/utils';
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
      <dialog ref={ref} className="bg-transparent p-15 w-[90vw] sm:w-[40vw]">
        <form method="dialog" className="modal-box gap-10">
          <dl className="flex flex-col gap-5 ">
            <div className="divider">
              <DataItem
                label="Recibo #"
                value={String(ticket.order.id)}
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
            <Divider className="text-base-content">Metodos de pago</Divider>
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
                value={discountToString(ticket.order.discount)}
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
          </dl>
          <RenderIf condition={ticket.order.items.length > 0}>
            <div className="divider text-base-content">Productos</div>
            <div className="flex flex-col p-5 overflow-y-scroll">
              {ticket.order.items.map((item) => (
                <OrderItem
                  updateMode={false}
                  key={item.product?.id}
                  item={item}
                />
              ))}
            </div>
          </RenderIf>
          <RenderIf condition={ticket.order.promoItems.length > 0}>
            <div className="divider text-base-content">Promos</div>
            {ticket.order.promoItems.map(({ promo }) => (
              <div key={promo.id!} className="flex p-4">
                <p>{promo.name}</p>
              </div>
            ))}
          </RenderIf>
          <div className="modal-action">
            <ButtonClose label="Cerrar" />
          </div>
        </form>
      </dialog>
    </>
  );
};

import { useRef } from "react";
import OrderItem from "./OrderItem";
import { IPayment, ITicket } from "@/interfaces/ITicket";
import { DataItem } from "./DataItem";

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
        Más info
      </button>
      <dialog ref={ref} className="bg-transparent p-15">
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
              value={ticket.order.phoneNumber}
              defaultValue="Sin teléfono"
            />
            {ticket.payments.map((payment) => (
              <DataItem
                key={payment.type}
                label="Otros pagos:"
                value={payment.amount}
                defaultValue={payment.type}
              />
            ))}
            <div className="divider text-stone-500">Productos</div>
          </dl>
          <div className="flex flex-col p-5 overflow-y-scroll">
            {ticket.order.items.map((item) => (
              <OrderItem isEditing={false} key={item.product!.id} item={item} />
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

import { useRef } from "react";
import OrderItem from "./OrderItem";
import { ITicket } from "@/interfaces/ITicket";

interface IMoreInfoModal {
    ticket: ITicket;
}
export const MoreInfoModal = ({ ticket }: IMoreInfoModal) => {
    const ref = useRef<HTMLDialogElement>(null);

    const handleClickMoreInfo = () => {
        ref.current?.showModal()
    }
    return (
        <>
            <button className="btn" onClick={() => handleClickMoreInfo()}>Más info</button>
            <dialog ref={ref} className="bg-transparent p-10">
                <form method="dialog" className="modal-box gap-10">
                    <div className='flex flex-col gap-5 '>
                        <h3 className="font-bold text-lg">Cliente: {ticket.order.client.name}</h3>
                        <p>Direccion: {ticket.order.client.address}</p>
                        <p>Telefono: {ticket.order.client.phone_number}</p>
                        <h3 className='text-2xl font-bold'>Productos:</h3>
                    </div>
                    <div className="flex flex-col p-5">
                        {ticket.order.items.map((item) => (
                            <OrderItem isEditing={false} key={item.product!.id} item={item} />
                        ))}
                    </div>
                    <div className="modal-action">
                        <button className="btn" >Cerrar</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}
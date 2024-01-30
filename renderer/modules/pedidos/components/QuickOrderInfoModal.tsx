import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { formatPrice } from '@/modules/common/libs/utils';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

interface IProps {
  order: IOrder;
}

export default function QuickOrderInfoModal({ order }: IProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.showModal();
  };
  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };
  return (
    <div>
      <button className="btn btn-primary btn-outline" onClick={handleOpenModal}>
        <InformationCircleIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className="modal-box ">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col p-5 gap-5">
            <p className="font-bold text-xl">Cliente:</p>
            {order.client ? (
              <div className="flex flex-row gap-5 whitespace-nowrap">
                <p>👤 {order.client.name}</p>
                <p>📍 {order.client.address}</p>
                <p>📲 {order.client.phone_number}</p>
              </div>
            ) : (
              <div className="flex flex-row gap-5 whitespace-nowrap">
                <p>👤 Consumidor final</p>
                {order.address ? <p>📍 {order.address}</p> : null}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-3 p-3 overflow-y-scroll h-56 ">
            <RenderIf condition={order.items.length}>
              <div className="divider">Productos</div>
              {order.items.map((item, index) => (
                <div key={index} className="w-full flex flex-col justify-end">
                  <p className="w-full flex flex-row justify-between whitespace-nowrap">
                    {item.quantity} &times; {item.product?.type.emoji}{' '}
                    {item.product?.name} - {item.selectedVariant.name}
                    <span className="flex flex-row whitespace-nowrap w-full gap-5 justify-end">
                      {formatPrice(item.price)}
                    </span>
                  </p>
                </div>
              ))}
            </RenderIf>
            <RenderIf condition={order.promoItems.length}>
              <div className="divider">Promos</div>
              {order.promoItems.map((itemPromo, index) => (
                <div key={index}>
                  <p>
                    {itemPromo.promo?.name} {formatPrice(itemPromo.promo.price)}
                  </p>
                  <p>{itemPromo.promo?.price}</p>
                  {itemPromo.selectedVariants?.map((v, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-4 gap-4 whitespace-nowrap justify-between text-sm"
                    >
                      <p>
                        {v.product.type.emoji} {v.product.name} -{' '}
                        <span>{v.name}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </RenderIf>
          </div>
        </div>
        <ButtonClose
          className="w-full justify-end p-5"
          label="Cerrar"
          onClick={handleCloseModal}
        />
      </dialog>
    </div>
  );
}

import { RenderIf } from '@/modules/common/components/RenderIf';
import { formatPrice } from '@/modules/common/libs/utils';
import { CancelOrderModal } from '@/modules/ordenes/components/CancelOrderModal';
import { ConfirmOrderModal } from '@/modules/ordenes/components/ConfirmOrderModal';
import useOrderQuery from '@/modules/ordenes/hooks/useOrderQuery';
import { IOrder, IOrderPayload } from '@/modules/ordenes/interfaces/IOrder';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';
import {
  ChevronDoubleLeftIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import QuickOrderInfoModal from './QuickOrderInfoModal';

export default function QuickOrders() {
  const paginationControls = useButtonPagination();
  const orderQuery = useOrderQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const orders = orderQuery.data?.orders || [];
  const [accordion, setAccordion] = useState(false);

  const handleChangeAccordion = () => {
    setAccordion(!accordion);
  };

  return (
    <section className="flex flex-col w-full gap-5">
      {orders.map((order: IOrder) => (
        <div className="collapse collapse-arrow border-2" key={order.id}>
          <input
            type="checkbox"
            onChange={handleChangeAccordion}
            name="my-accordion-3"
          />
          <div className="collapse-title text-xl font-medium">
            <p>
              Orden #{order.id}{' '}
              <span className="badge badge-info text-neutral-focus">
                Pendiente
              </span>
            </p>
          </div>
          <div className="collapse-content">
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col gap-3 p-3 overflow-y-scroll h-56 ">
                <RenderIf condition={order.items.length}>
                  <div className="divider">Productos</div>
                  {order.items.map((item, index) => (
                    <div
                      className=" w-full gap-5 justify-between whitespace-nowrap"
                      key={index}
                    >
                      <p>
                        {item.product?.type.emoji} {item.product?.name} -{' '}
                        {item.selectedVariant.name} &times;{item.quantity} -{' '}
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  ))}
                </RenderIf>
                <RenderIf condition={order.promoItems.length}>
                  <div className="divider">Promos</div>
                  {order.promoItems.map((itemProm, index) => (
                    <div
                      className=" w-full gap-5 justify-end whitespace-nowrap"
                      key={index}
                    >
                      <p>
                        {itemProm.promo.name} -{' '}
                        {formatPrice(itemProm.promo.price)}
                      </p>
                      {itemProm.selectedVariants?.map((v, index) => (
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
              <div className="w-full flex flex-row items-center justify-evenly ">
                <ConfirmOrderModal order={order} />
                <p className="text-center font-bold">
                  {' '}
                  {formatPrice(order.totalPrice)}
                </p>
                <CancelOrderModal order={order} />
                <QuickOrderInfoModal order={order} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <ButtonPagination {...paginationControls} />
    </section>
  );
}

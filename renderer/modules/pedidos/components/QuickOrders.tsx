import { RenderIf } from '@/modules/common/components/RenderIf';
import { CancelOrderModal } from '@/modules/ordenes/components/CancelOrderModal';
import { ConfirmOrderModal } from '@/modules/ordenes/components/ConfirmOrderModal';
import useOrderQuery from '@/modules/ordenes/hooks/useOrderQuery';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';
import { useState } from 'react';
import QuickOrderInfoModal from './QuickOrderInfoModal';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';

export default function QuickOrders() {
  const paginationControls = useButtonPagination();
  const orderQuery = useOrderQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const orders = orderQuery.data?.orders || [];
  const [accordion, setAccordion] = useState(true);

  const handleChangeAccordion = () => {
    setAccordion(!accordion);
  };

  if (!orders?.length) {
    return null;
  }

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
            <div className="w-ful flex flex-row items-center">
              <p className="whitespace-nowrap">Orden #{order.id} </p>
            </div>
          </div>
          <div className="collapse-content">
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col gap-3 p-3 ">
                <RenderIf condition={order.items.length}>
                  <Divider>Productos</Divider>
                  {order.items.map((item, index) => (
                    <div
                      className=" w-full gap-5 justify-between whitespace-nowrap"
                      key={index}
                    >
                      <p>
                        {item.product?.type.emoji} {item.product?.name} -{' '}
                        {item.selectedVariant.name}
                      </p>
                    </div>
                  ))}
                </RenderIf>
                <RenderIf condition={order.promoItems.length}>
                  <Divider>Promo</Divider>
                  {order.promoItems.map((itemProm, index) => (
                    <div
                      className=" w-full gap-5 justify-end whitespace-nowrap"
                      key={index}
                    >
                      <p>{itemProm.promo.name}</p>
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
            </div>
            <div className="w-full flex flex-row items-center justify-evenly ">
              <ConfirmOrderModal order={order} />
              <QuickOrderInfoModal order={order} />
              <CancelOrderModal order={order} />
            </div>
          </div>
        </div>
      ))}
      <ButtonPagination {...paginationControls} />
    </section>
  );
}

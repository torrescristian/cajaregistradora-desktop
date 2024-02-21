import { RenderIf } from '@/modules/common/components/RenderIf';
import { formatPrice } from '@/modules/common/libs/utils';
import { CancelOrderModal } from '@/modules/ordenes/components/CancelOrderModal';
import { ConfirmOrderModal } from '@/modules/ordenes/components/ConfirmOrderModal';
import useOrderQuery from '@/modules/ordenes/hooks/useOrderQuery';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';
import QuickOrderInfoModal from './QuickOrderInfoModal';
import FormRow from '@/modules/ordenes/components/FormRow';

export default function QuickOrders() {
  const paginationControls = useButtonPagination();
  const orderQuery = useOrderQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });
  const orders = orderQuery.data?.orders || [];

  if (!orders.length) {
    return null;
  }

  return (
    <section className="flex flex-col w-full gap-5">
      {orders.map((order: IOrder) => (
        <FormRow
          order={order}
          onSubmit={() => {}}
          key={order.id}
          className="border-2"
          disableRow
        >
          <div className="w-full flex flex-col gap-3 p-5">
            <div className="w-full flex flex-col gap-3 p-3 overflow-y-scroll">
              <RenderIf condition={order.items.length}>
                <div className="divider"> Orden #{order.id} </div>
                {order.items.map((item, index) => (
                  <div
                    className=" w-full gap-5 justify-between whitespace-nowrap"
                    key={index}
                  >
                    <p>
                      {item.quantity} &times; {item.product?.type.emoji}{' '}
                      {item.product?.name} - {item.selectedVariant.name}
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
                        className="flex flex-row p-4 gap-3 whitespace-nowrap justify-between text-sm"
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
            <div className="w-full flex flex-col items-center justify-evenly gap-3">
              <p className="text-center font-bold text-2xl">
                {formatPrice(order.totalPrice)}
              </p>
              <div className="flex flex-row">
                <ConfirmOrderModal order={order} />
                <QuickOrderInfoModal order={order} />
                <CancelOrderModal order={order} />
              </div>
            </div>
          </div>
        </FormRow>
      ))}
      {paginationControls.page > 1 ? (
        <ButtonPagination {...paginationControls} />
      ) : null}
    </section>
  );
}

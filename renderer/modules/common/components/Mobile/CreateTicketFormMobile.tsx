import {
  formatPrice,
  parseDateToArgentinianFormat,
} from '@/modules/common/libs/utils';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { DataItem } from '@/modules/common/components/DataItem';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import OrderItem from '../../../ordenes/components/OrderItem';
import Loader from '@/modules/common/components/Loader';
import ValidateCoupon from '../../../ordenes/components/ValidateCoupon';
import 'react-toastify/dist/ReactToastify.css';
import HighlightedText from '@/modules/common/components/HighlightedText';
import Payments from '../../../ordenes/components/Payments';
import { DiscountTypeControl } from '../DiscountTypeControl';
import useCreateTicketForm from '../../../ordenes/hooks/useCreateTicketForm';

interface IProps {
  order: IOrder;
  updateMode?: boolean;
  handleToggleEdit: () => void;
}
export const CreateTicketFormMobile = ({
  order,
  updateMode,
  handleToggleEdit,
}: IProps) => {
  const {
    cancelOrderMutation,
    coupon,
    createTicketMutation,
    discountAmount,
    discountType,
    finalTotalPrice,
    handleCancelOrder,
    handleChangePayment,
    handleClickAddPaymentMethod,
    handleCouponDiscountAmount,
    handleDeletePayment,
    handleSubmitCreateTicket,
    handleToggleAccordion,
    isCheckedAcordion,
    payments,
    setDiscountAmount,
    setDiscountType,
  } = useCreateTicketForm({ order });

  return (
    <div className="flex w-full flex-col">
      <div className="collapse bg-base-200">
        <input
          type="checkbox"
          onChange={handleToggleAccordion}
          name="my-accordion-3"
        />
        <div className="collapse-title text-xl font-medium">
          <div className="flex flex-row gap-16 items-end justify-between">
            <div className="flex flex-col gap-10">
              <p className="text-xl font-bold">
                <ShoppingCartIcon className="w-5 inline" /> Orden # {order.id}{' '}
              </p>
              <p className="whitespace-nowrap text-lg">
                <UserIcon className="w-5 inline" />{' '}
                {order.client?.name || 'Consumidor Final'}
              </p>
            </div>
            <button className="btn w-max btn-outline">
              {isCheckedAcordion ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="collapse-content">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-end gap-3">
              <button
                className="btn btn-neutral text-base-content"
                onClick={handleToggleEdit}
              >
                <PencilIcon className="w-full h-6 " />
              </button>

              <button
                disabled={cancelOrderMutation.isLoading}
                className="btn btn-error text-base-content"
                onClick={handleCancelOrder}
              >
                <TrashIcon className="w-full h-6 " />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <datalist className="flex flex-col gap-4">
              <p className="flex flex-row items-center gap-3 ">
                {' '}
                <CalendarDaysIcon className="w-5 inline text-base-content" />{' '}
                {parseDateToArgentinianFormat(order.createdAt)}
              </p>
              {order.address ? (
                <p className="flex flex-row items-center gap-3 ">
                  <MapPinIcon className="w-5 inline text-base-content" />{' '}
                  {order.address}
                </p>
              ) : null}
              {order.client?.phone_number ? (
                <p className="flex flex-row items-center gap-3">
                  <DevicePhoneMobileIcon className="w-5 inline  text-base-content" />{' '}
                  {order.client?.phone_number}
                </p>
              ) : null}
              {order.additionalDetails && (
                <DataItem
                  label="Observaciones:"
                  value={order.additionalDetails}
                  defaultValue=""
                />
              )}

              <div className="divider" />
            </datalist>
            <div className="flex flex-col p-5 gap-3 overflow-y-scroll h-44">
              {order.items.map((item, itemIndex) => (
                <OrderItem
                  updateMode={updateMode}
                  key={itemIndex}
                  item={item}
                />
              ))}
              {order.promoItems.map((promoItem, indexPromo) => (
                <RenderIf condition={promoItem.promo} key={indexPromo}>
                  <div className="flex flex-col gap-2">
                    <div className="divider">Promo</div>
                    <p className="text-xl text-center">
                      ✨ {promoItem.promo?.name}
                    </p>
                    <HighlightedText>
                      {formatPrice(promoItem.promo.price)}
                    </HighlightedText>
                    {promoItem.selectedVariants?.map((v, index) => (
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
                </RenderIf>
              ))}
            </div>

            <div className="divider">Pagos</div>
            <div className="flex flex-col gap-4">
              <DataItem
                label="Subtotal:"
                value={formatPrice(order.subtotalPrice)}
                defaultValue=""
              />
              <ValidateCoupon
                subtotalPrice={order.subtotalPrice}
                onChange={handleCouponDiscountAmount}
                coupon={coupon}
              />
              <DiscountTypeControl
                discountAmount={discountAmount}
                discountType={discountType}
                onChangeAmount={setDiscountAmount}
                onChangeType={setDiscountType}
              />
              <DataItem
                label="Total:"
                value={formatPrice(finalTotalPrice)}
                defaultValue=""
                className="text-2xl"
              />
              <Payments
                newTotalPrice={finalTotalPrice}
                onChange={handleChangePayment}
                onDelete={handleDeletePayment}
                onNewPayment={handleClickAddPaymentMethod}
                payments={payments}
              />
              <button
                onClick={handleSubmitCreateTicket}
                disabled={createTicketMutation.isLoading || updateMode}
                className="btn btn-success disabled:btn-disabled text-base-content"
              >
                {createTicketMutation.isLoading ? (
                  <Loader />
                ) : (
                  'Confirmar orden'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

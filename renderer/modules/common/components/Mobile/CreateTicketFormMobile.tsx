import {
  calcDiscount,
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
import {
  DISCOUNT_TYPE,
  IDiscount,
  IOrder,
} from '@/modules/ordenes/interfaces/IOrder';
import { IPayment, PAYMENT_TYPE } from '@/modules/recibos/interfaces/ITicket';
import { useForm } from 'react-hook-form';
import OrderItem from '../../../ordenes/components/OrderItem';
import Loader from '@/modules/common/components/Loader';
import useCreateTicketMutation from '@/modules/ordenes/hooks/useCreateTicketMutation';
import useCancelOrderMutation from '@/modules/ordenes/hooks/useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { useState } from 'react';
import ValidateCoupon from '../../../ordenes/components/ValidateCoupon';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HighlightedText from '@/modules/common/components/HighlightedText';
import usePrintService from '@/modules/common/hooks/usePrintService';
import Payments from '../../../ordenes/components/Payments';
import { IPromoItem } from '@/modules/cart/interfaces/ICart';
import { DiscountTypeControl } from '../DiscountTypeControl';

interface IProps {
  order: IOrder;
  updateMode?: boolean;
  handleToggleEdit: () => void;
}
interface IFormControl {
  additionalDetails: string;
  totalPrice: number;
  discountAmount: number;
  discountType: DISCOUNT_TYPE;
  promoItems: IPromoItem[];
}

export const CreateTicketFormMobile = ({
  order,
  updateMode,
  handleToggleEdit,
}: IProps) => {
  const createTicketMutation = useCreateTicketMutation();
  const cancelOrderMutation = useCancelOrderMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(
    order.discount?.amount!,
  );
  const finalTotalPrice = order.totalPrice - couponDiscount - discountAmount;

  const [payments, setPayments] = useState<IPayment[]>([
    {
      amount: finalTotalPrice,
      type: PAYMENT_TYPE.CASH,
    },
  ]);
  const [coupon, setCoupon] = useState<ICoupon | undefined>(order.coupon);
  const [isCheckedAcordion, setIsCheckedAcordion] = useState(false);

  const [discountType, setDiscountType] = useState<DISCOUNT_TYPE>(
    DISCOUNT_TYPE.FIXED,
  );

  const { printInvoice } = usePrintService();

  const handleToggleAccordion = () => {
    setIsCheckedAcordion(!isCheckedAcordion);
  };
  const handleCancelOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await cancelOrderMutation.mutateAsync(order);
      toast.success('Orden cancelada con exito');
    } catch (e) {
      toast.error('No se pudo cancelar la orden');
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      additionalDetails: order.additionalDetails,
      discountAmount,
      discountType,
      totalPrice: order.totalPrice,
      promoItems: order.promoItems,
    },
  });

  const handleSubmitCreateTicket = async () => {
    try {
      const { ticketResponse } = await createTicketMutation.mutateAsync({
        ticket: {
          order: order.id!,
          totalPrice: finalTotalPrice,
          cashBalance: activeCashBalanceQuery.cashBalance?.id!,
          payments,
          couponDiscount: order.discount
            ? calcDiscount({
              discountAmount,
              discountType,
              price: finalTotalPrice,
            })
            : couponDiscount,
        },
        coupon: {
          id: order.coupon?.id || coupon?.id,
          availableUses: order.coupon?.availableUses || coupon?.availableUses!,
        },
      });

      await printInvoice(ticketResponse.data.id);

      toast.success('Pagado con exito');
    } catch (error) {
      console.error(error);
      toast.error(`No se está cobrando correctamente`);
    }
  };

  const handleCouponDiscountAmount = ({
    couponDiscount,
    coupon,
  }: {
    couponDiscount: number;
    coupon: ICoupon;
  }) => {
    setCouponDiscount(couponDiscount || 0);
    setCoupon(coupon);
  };
  const handleChangeDiscountType = (discount: IDiscount) => {
    setDiscountType(discount.type);
    setDiscountAmount(discount.amount);
  };

  const handleChangePayments = (newPayments: IPayment[]) => {
    setPayments(newPayments);
  };
  return (
    <form
      className="flex w-fullflex-col"
      onSubmit={handleSubmit(handleSubmitCreateTicket)}
    >
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
                className="btn btn-secondary text-text-base-content"
                onClick={handleToggleEdit}
              >
                <PencilIcon className="w-full h-6 " />
              </button>

              <button
                disabled={cancelOrderMutation.isLoading}
                className="btn btn-error text-text-base-content"
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
                <CalendarDaysIcon className="w-5 inline text-text-base-content" />{' '}
                {parseDateToArgentinianFormat(order.createdAt)}
              </p>
              {order.address ? (
                <p className="flex flex-row items-center gap-3 ">
                  <MapPinIcon className="w-5 inline text-text-base-content" />{' '}
                  {order.address}
                </p>
              ) : null}
              {order.client?.phone_number ? (
                <p className="flex flex-row items-center gap-3">
                  <DevicePhoneMobileIcon className="w-5 inline  text-text-base-content" />{' '}
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
                onChange={handleChangeDiscountType}
              />
              <DataItem
                label="Total:"
                value={formatPrice(finalTotalPrice)}
                defaultValue=""
                className="text-2xl"
              />
              <Payments
                newTotalPrice={finalTotalPrice}
                onChange={handleChangePayments}
              />
              <button
                type="submit"
                disabled={createTicketMutation.isLoading || updateMode}
                className="btn btn-success disabled:btn-disabled text-text-base-content"
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
    </form>
  );
};

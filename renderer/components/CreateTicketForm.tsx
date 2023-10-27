import {
  calcDiscount,
  formatPrice,
  parseDateToArgentinianFormat,
} from '@/libs/utils';
import {
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { DataItem } from './DataItem';
import { RenderIf } from './RenderIf';
import { DISCOUNT_TYPE, IOrder } from '@/interfaces/IOrder';
import { IPayment } from '@/interfaces/ITicket';
import { useForm } from 'react-hook-form';
import OrderItem from './OrderItem';
import Loader from './Loader';
import useCreateTicketMutation from '@/hooks/services/useCreateTicketMutation';
import useCancelOrderMutation from '@/hooks/services/useCancelOrderMutation';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { MouseEventHandler, useState } from 'react';
import Payments from './Payments';
import ValidateCoupon from './Coupons/ValidateCoupon';
import { ICoupon } from '@/interfaces/ICoupon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IPromoItem } from '@/interfaces/ICart';
import HighlightedText from './HighlightedText';
import SubmitButton from './SubmitButton';

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

export const CreateTicketForm = ({
  order,
  updateMode,
  handleToggleEdit,
}: IProps) => {
  const createTicketMutation = useCreateTicketMutation();
  const cancelOrderMutation = useCancelOrderMutation();
  const activeCashBalanceQuery = useActiveCashBalanceQuery();

  const [payments, setPayments] = useState<IPayment[]>([]);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [coupon, setCoupon] = useState<ICoupon | undefined>(order.coupon);

  const finalTotalPrice = order.totalPrice - couponDiscount;

  const handleCancelOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await cancelOrderMutation.mutateAsync(order);
      toast.success('Orden cancelada con exito');
    }
    catch (e) {
      toast.error('No se pudo cancelar la orden');
    }
  };

  const handleChangePayments = (newPayments: IPayment[]) => {
    setPayments(newPayments);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IFormControl>({
    defaultValues: {
      additionalDetails: order.additionalDetails,
      discountAmount: order.discount?.amount || 0,
      discountType: order.discount?.type || DISCOUNT_TYPE.FIXED,
      totalPrice: order.totalPrice,
      promoItems: order.promoItems,
    },
  });

  const handleSubmitCreateTicket = async () => {
    try {
      await createTicketMutation.mutateAsync({
        ticket: {
          order: order.id!,
          totalPrice: finalTotalPrice,
          cashBalance: activeCashBalanceQuery.cashBalance?.id!,
          payments,
          couponDiscount: order.discount
            ? calcDiscount({
              discountAmount: order.discount?.amount!,
              discountType: order.discount?.type!,
              price: finalTotalPrice,
            })
            : couponDiscount,
        },
        coupon: {
          id: order.coupon?.id || coupon?.id,
          availableUses: order.coupon?.availableUses || coupon?.availableUses!,
        },
      });

      toast.success('Pagado con exito');
    } catch (error) {
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

  return (
    <form
      className="flex w-full h-full justify-between flex-col gap-5"
      onSubmit={handleSubmit(handleSubmitCreateTicket)}
    >
      <div className="flex flex-row justify-between gap-3">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">
            <ShoppingCartIcon className="w-5 inline" /> Orden # {order.id}{' '}
          </p>
          <p>
            <UserIcon className="w-5 inline" />{' '}
            {order.client?.name || 'Consumidor Final'}
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <button
            className="btn btn-secondary text-stone-50"
            onClick={handleToggleEdit}
          >
            <PencilIcon className="w-full h-6 " />
          </button>

          <button
            disabled={cancelOrderMutation.isLoading}
            className="btn btn-error text-stone-50"
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
            <CalendarDaysIcon className="w-5 inline text-stone-500" />{' '}
            {parseDateToArgentinianFormat(order.createdAt)}
          </p>
          {order.address ? (
            <p className="flex flex-row items-center gap-3 ">
              <MapPinIcon className="w-5 inline text-stone-500" />{' '}
              {order.address}
            </p>
          ) : null}
          {order.client?.phone_number ? (
            <p className="flex flex-row items-center gap-3">
              <DevicePhoneMobileIcon className="w-5 inline  text-stone-500" />{' '}
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
          {order.items.map((item,itemIndex) => (
            <OrderItem
              updateMode={updateMode}
              key={itemIndex}
              item={item}
            />
          ))}
          {order.promoItems.map((promoItem,indexPromo) => (
            <RenderIf condition={promoItem.promo} key={indexPromo}>
              <div className="flex flex-col gap-2">
                <div className="divider">Promo</div>
                <p className="text-xl text-center">
                  ✨ {promoItem.promo?.name}
                </p>
                <HighlightedText>
                  {formatPrice(promoItem.promo.price)}
                </HighlightedText>
                {promoItem.selectedVariants?.map((v,index) => (
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
          <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.FIXED}>
            <DataItem
              label="Descuento:"
              value={formatPrice(order.discount?.amount!)}
              defaultValue=""
            />
          </RenderIf>
          <RenderIf condition={order.discount?.type! === DISCOUNT_TYPE.PERC}>
            <DataItem
              label="Descuento:"
              value={order.discount?.amount! + '%'}
              defaultValue=""
            />
          </RenderIf>
          <RenderIf condition={!order.discount}>
            <DataItem
              label="Descuento:"
              value=""
              defaultValue={formatPrice(0)}
            />
          </RenderIf>

          <DataItem
            label="Total:"
            value={formatPrice(finalTotalPrice)}
            defaultValue=""
            className="text-2xl"
          />
          <Payments onChange={handleChangePayments} />
          <button
            type="submit"
            disabled={createTicketMutation.isLoading || updateMode}
            className="btn btn-success disabled:btn-disabled text-stone-50"
          >
            {createTicketMutation.isLoading ? <Loader /> : 'Confirmar orden'}
          </button>
        </div>
      </div>
    </form>
  );
};

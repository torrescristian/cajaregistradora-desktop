import {
  TICKET_STATUS,
  ITicketPayload,
  PAYMENT_TYPE,
  ITicket,
} from '@/modules/recibos/interfaces/ITicket';
import strapi from '@/modules/common/libs/strapi';
import { TicketPayloadSchema } from '@/schemas/TicketSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  IDiscount,
  IOrder,
  ORDER_STATUS,
} from '@/modules/ordenes/interfaces/IOrder';
import useActiveCashBalanceQuery from '../../caja/hooks/useActiveCashBalanceQuery';
import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';
import {
  TICKETS_KEY,
  ORDERS_KEY,
  COUPONS_KEY,
  CASH_BALANCE_KEY,
  DELIVERIES_KEY,
} from '@/modules/common/consts';
import {
  DELIVERY_STATUS,
  IDelivery,
} from '@/modules/cart/interfaces/IDelivery';

type ICreateTicketMutation = Omit<ITicketPayload, 'id' | 'status'>;

interface IProps {
  ticket: ICreateTicketMutation;
  coupon?: Pick<ICoupon, 'id' | 'availableUses'>;
  discount: IDiscount;
  delivery?: IDelivery;
}

export default function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  const { cashBalance } = useActiveCashBalanceQuery();

  function calcNewCashAmount(ticket: ICreateTicketMutation) {
    if (!cashBalance) {
      throw new Error('Cash balance is not active');
    }

    const cashPayment = ticket.payments.find(
      (payment) => payment.type === PAYMENT_TYPE.CASH,
    );

    if (!cashPayment) {
      return cashBalance.newCashAmount;
    }

    return Number(cashBalance.newCashAmount) + Number(cashPayment.amount);
  }

  function calcDigitalCashAmount(ticket: ICreateTicketMutation) {
    if (!cashBalance) {
      throw new Error('Cash balance is not active');
    }

    const cashPayment = ticket.payments.find((payment) =>
      [PAYMENT_TYPE.DEBIT, PAYMENT_TYPE.CREDIT].includes(payment.type),
    );

    if (!cashPayment) {
      return cashBalance.digitalCashAmount;
    }

    return Number(cashBalance.digitalCashAmount) + Number(cashPayment.amount);
  }

  return useMutation(async ({ ticket, coupon, discount, delivery }: IProps) => {
    await TicketPayloadSchema().validate(ticket);
    const sum = ticket.payments.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );
    if (sum !== ticket.totalPrice) {
      throw new Error(
        `No se está cobrando correctamente (total: ${ticket.totalPrice}, cobrando: ${sum})`,
      );
    }

    const ticketResPromise = strapi.create(TICKETS_KEY, {
      ...ticket,
      status: TICKET_STATUS.PAID,
    } as ITicketPayload);

    const orderResPromise = strapi.update(ORDERS_KEY, ticket.order, {
      status: ORDER_STATUS.PAID,
      coupon: coupon?.id,
      discount,
    } as Partial<IOrder>);
    let couponRestPromise;
    if (coupon?.id) {
      couponRestPromise = strapi.update(COUPONS_KEY, coupon.id, {
        availableUses: coupon.availableUses - 1,
      } as Partial<ICoupon>);
    }

    const newCashBalancePromise = strapi.update(
      CASH_BALANCE_KEY,
      cashBalance?.id!,
      {
        totalAmount: cashBalance?.totalAmount! + ticket.totalPrice,
        digitalCashAmount: calcDigitalCashAmount(ticket),
        newCashAmount: calcNewCashAmount(ticket),
      },
    );

    let deliveryPromise;
    if (delivery) {
      deliveryPromise = strapi.update(DELIVERIES_KEY, delivery.id!, {
        status: DELIVERY_STATUS.DELIVERED,
      });
    }

    const res = await Promise.all([
      ticketResPromise,
      orderResPromise,
      newCashBalancePromise,
      couponRestPromise,
      deliveryPromise,
    ]);

    queryClient.invalidateQueries([COUPONS_KEY]);
    queryClient.invalidateQueries([ORDERS_KEY]);
    queryClient.invalidateQueries([TICKETS_KEY]);
    queryClient.invalidateQueries([CASH_BALANCE_KEY]);

    return {
      ticketResponse: res[0] as IStrapiSingleResponse<ITicket>,
      orderResponse: res[1] as IStrapiSingleResponse<IOrder>,
      cashBalanceResponse: res[2],
      couponResponse: res[3],
      deliveryResponse: res[4],
    };
  });
}

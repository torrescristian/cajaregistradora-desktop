import {
  TICKET_STATUS,
  ITicketPayload,
  PAYMENT_TYPE,
} from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import { TicketPayloadSchema } from '@/schemas/TicketSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderQueryKey } from './useOrderQuery';
import { getTicketsQueryKey } from './useTicketQuery';
import { IOrder, ORDER_STATUS } from '@/interfaces/IOrder';
import useActiveCashBalanceQuery, {
  getCashBalanceKey,
} from './useActiveCashBalanceQuery';
import { getCouponQueryKey } from './useCouponsQuery';
import { ICoupon } from '@/interfaces/ICoupon';
import { IStrapiSingleResponse } from '@/interfaces/utils';

type ICreateTicketMutation = Omit<ITicketPayload, 'id' | 'status'>;

interface IProps {
  ticket: ICreateTicketMutation;
  coupon?: Pick<ICoupon, 'id' | 'availableUses'>;
}

export default function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  const { cashBalance, isLoading, isError, isSuccess, cashIsActive } =
    useActiveCashBalanceQuery();

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

  return useMutation(async ({ ticket, coupon }: IProps) => {
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

    const ticketResPromise = strapi.create(getTicketsQueryKey(), {
      ...ticket,
      status: TICKET_STATUS.PAID,
    } as ITicketPayload);

    const orderResPromise = strapi.update(getOrderQueryKey(), ticket.order, {
      status: ORDER_STATUS.PAID,
      coupon: coupon?.id,
    });
    let couponRestPromise;
    if (coupon?.id) {
      couponRestPromise = strapi.update(getCouponQueryKey(), coupon.id, {
        availableUses: coupon.availableUses - 1,
      } as Partial<ICoupon>);
    }

    const newCashBalancePromise = strapi.update(
      getCashBalanceKey(),
      cashBalance?.id!,
      {
        totalAmount: cashBalance?.totalAmount! + ticket.totalPrice,
        newCashAmount: calcNewCashAmount(ticket),
      },
    );

    const res = await Promise.all([
      ticketResPromise,
      orderResPromise,
      newCashBalancePromise,
      couponRestPromise,
    ]);

    queryClient.invalidateQueries([getOrderQueryKey()]);
    queryClient.invalidateQueries([getTicketsQueryKey()]);
    queryClient.invalidateQueries([getCashBalanceKey()]);

    return {
      ticketResponse: res[0],
      orderResponse: res[1] as IStrapiSingleResponse<IOrder>,
      cashBalanceResponse: res[2],
      couponResponse: res[3],
    };
  });
}

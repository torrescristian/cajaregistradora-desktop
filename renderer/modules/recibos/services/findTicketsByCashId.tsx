import findACashById from '@/modules/caja/hooks/findActiveCashBalance';
import { ICashBalance } from '@/modules/caja/interfaces/ICashBalance';
import {
  IExpense,
  IExpensesResponse,
} from '@/modules/caja/interfaces/IExpense';
import { EXPENSES_KEY, TICKETS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import {
  ITicket,
  ITicketResponse,
  TICKET_STATUS,
} from '@/modules/recibos/interfaces/ITicket';

interface IResponse {
  tickets: ITicket[];
  cashBalance: ICashBalance;
  refundedTickets: ITicket[];
  expenses: IExpense[];
}

export default async function findCashOptionsById(
  cashId: number,
): Promise<IResponse> {
  const cashBalance = await findACashById(cashId);

  const populate = [
    'cashBalance',
    'order',
    'order.discount.amount',
    'payments',
    'order.client',
    'order.items.product',
    'order.items.product.image',
    'order.discount',
    'order.payments',
    'order.items.selectedVariant',
    'order.coupon',
    'order.promoItems',
    'order.promoItems.promo',
    'order.promoItems.selectedVariants',
    'order.promoItems.selectedVariants.product',
    'order.store',
    'store',
  ];

  const ticketResponse = (await strapi.find(TICKETS_KEY, {
    populate,
    filters: {
      cashBalance: cashId,
      status: TICKET_STATUS.PAID,
    },
    // @ts-ignore
    pageSize: 10000,
  })) as unknown as ITicketResponse;

  const refundedResponse = (await strapi.find(TICKETS_KEY, {
    populate,
    filters: {
      cashBalance: cashId,
      status: TICKET_STATUS.REFUNDED,
    },
    // @ts-ignore
    pageSize: 10000,
  })) as unknown as ITicketResponse;

  const expensesResponse = (await strapi.find(EXPENSES_KEY, {
    populate: ['type'],
    filters: {
      cashBalance: cashBalance?.id,
    },
  })) as unknown as IExpensesResponse;

  return {
    tickets: ticketResponse.results,
    cashBalance: cashBalance!,
    refundedTickets: refundedResponse.results,
    expenses: expensesResponse.results,
  };
}

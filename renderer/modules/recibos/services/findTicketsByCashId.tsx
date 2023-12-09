import findACashById from '@/modules/caja/hooks/findActiveCashBalance';
import { ICashBalance } from '@/modules/caja/interfaces/ICashBalance';
import { TICKETS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { ITicket, ITicketResponse } from '@/modules/recibos/interfaces/ITicket';

interface IResponse {
  tickets: ITicket[];
  cashBalance: ICashBalance;
}

export default async function findCashOptionsById(
  cashId: number,
): Promise<IResponse> {
  const cashBalance = await findACashById(cashId);

  const ticketResponse = (await strapi.find(TICKETS_KEY, {
    populate: [
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
    ],
    filters: {
      cashBalance: cashId,
    },
    pageSize: 10000,
  })) as unknown as ITicketResponse;

  return {
    tickets: ticketResponse.results,
    cashBalance: cashBalance!,
  };
}

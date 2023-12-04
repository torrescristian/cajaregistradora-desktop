import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { ITicket, ITicketResponse, TICKET_STATUS } from '@/modules/recibos/interfaces/ITicket';
import { TICKETS_KEY } from '@/modules/common/consts';

export default function useTicketPendingQuery() {
  return useQuery<ITicket[]>([TICKETS_KEY], async () => {
    const ticketResponse = (await strapi.find(TICKETS_KEY, {
      populate: [
        'order',
        'order.client',
        'order.items.product',
        'order.items.product.type',
        'payments',
        'order.items.selectedVariant',
        'order.coupon',
        'order.discount.amount',
        'order.promoItems',
        'order.promoItems.promo',
        'cashBalance',
      ],
      filters: {
        status :  TICKET_STATUS.WAITING_FOR_REFUND,
        
      }
    })) as unknown as ITicketResponse;
    return ticketResponse.results;
  });
}

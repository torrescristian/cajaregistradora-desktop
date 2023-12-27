import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import {
  ITicket,
  ITicketResponse,
  TICKET_STATUS,
} from '@/modules/recibos/interfaces/ITicket';
import { TICKETS_KEY } from '@/modules/common/consts';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  tickets: ITicket[];
  totalPages: number;
}

export default function useTicketPendingQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([TICKETS_KEY, page], async () => {
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
        status: TICKET_STATUS.WAITING_FOR_REFUND,
      },
      /*@ts-ignore */
      page,
    })) as unknown as ITicketResponse;
    setTotalPages?.(ticketResponse.pagination.pageCount!);
    return {
      tickets: ticketResponse.results,
      totalPages: ticketResponse.pagination.pageCount!,
    };
  });
}

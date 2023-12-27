import { useQuery } from '@tanstack/react-query';
import {
  ICashBalance,
  ICashBalanceExpanded,
  ICashBalancePage,
} from '../interfaces/ICashBalance';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY } from '@/modules/common/consts';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  cashBalances: ICashBalanceExpanded[];
  totalPages: number;
}

export default function useCashBalancesQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([CASH_BALANCE_KEY, page], async () => {
    const res = (await strapi.find(CASH_BALANCE_KEY, {
      filters: {},
      populate: [
        'cash-balances',
        'seller',
        'tickets',
        'tickets.order',
        'tickets.order.items.product',
        'tickets.order.items.product.type',
        'tickets.payments',
        'tickets.order.items.selectedVariant',
        'tickets.order.coupon',
        'tickets.order.discount.amount',
        'tickets.order.promoItems',
        'tickets.promoItems.promo',
      ],
      /*@ts-ignore*/
      page,
    })) as unknown as ICashBalancePage;
    setTotalPages?.(res.pagination.pageCount!);
    return {
      cashBalances: res.results,
      totalPages: res.pagination.pageCount!,
    };
  });
}

import { useQuery } from '@tanstack/react-query';
import {
  ICashBalanceExpanded,
  ICashBalancePage,
} from '../interfaces/ICashBalance';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY } from '@/modules/common/consts';
import { endOfDay, startOfDay } from 'date-fns';

interface IProps {
  endDate: Date | null;
  page: number;
  pageSize: number;
  startDate: Date | null;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  cashBalances: ICashBalanceExpanded[];
  totalPages: number;
}

export default function useCashBalancesByDateQuery({
  page,
  setTotalPages,
  endDate,
  startDate,
}: IProps) {
  return useQuery<IResponse>(
    [CASH_BALANCE_KEY, page, startDate, endDate],
    async () => {
      if (!startDate || !endDate) {
        return {
          cashBalances: [],
          totalPages: 0,
        };
      }

      const res = (await strapi.find(CASH_BALANCE_KEY, {
        filters: {
          createdAt: {
            $gte: startOfDay(startDate),
            $lte: endOfDay(endDate),
          },
        },
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
    },
  );
}

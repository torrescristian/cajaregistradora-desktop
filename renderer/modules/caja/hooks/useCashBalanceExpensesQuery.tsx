import { EXPENSES_KEY } from '@/modules/common/consts';
import { IExpense, IExpensesResponse } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  expenses: IExpense[];
  totalPages: number;
}

export default function useCashBalanceExpensesQuery({
  page,
  setTotalPages,
}: IProps) {
  const { cashBalance } = useActiveCashBalanceQuery();
  return useQuery<IResponse>(
    [EXPENSES_KEY, page, cashBalance?.id!],
    async () => {
      const resp = (await strapi.find(EXPENSES_KEY, {
        populate: ['type'],
        filters: {
          cashBalance: cashBalance?.id,
        },
        /*@ts-ignore */
        page,
      })) as unknown as IExpensesResponse;
      setTotalPages?.(resp.pagination.pageCount!);
      return {
        expenses: resp.results,
        totalPages: resp.pagination.pageCount!,
      };
    },
  );
}

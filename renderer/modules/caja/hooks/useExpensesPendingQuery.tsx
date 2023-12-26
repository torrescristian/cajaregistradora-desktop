import { EXPENSES_KEY } from '@/modules/common/consts';
import {
  IExpense,
  IExpensesResponse,
  STATUS_EXPENSE,
} from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  expenses: IExpense[];
  totalPages: number;
}

export default function useExpensesPendingQuery({
  page,
  setTotalPages,
}: IProps) {
  return useQuery<IResponse>([EXPENSES_KEY, page], async () => {
    const resp = (await strapi.find(EXPENSES_KEY, {
      populate: ['type', 'cashBalance'],
      filters: {
        status: STATUS_EXPENSE.PENDING,
      },
      /*@ts-ignore*/
      page,
    })) as unknown as IExpensesResponse;
    setTotalPages?.(resp.pagination.pageCount!);
    return {
      expenses: resp.results,
      totalPages: resp.pagination.pageCount!,
    };
  });
}

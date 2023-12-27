import {
  IExpense,
  IExpensesResponse,
  STATUS_EXPENSE,
} from '@/modules/caja/interfaces/IExpense';
import { EXPENSES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { set } from 'date-fns';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  expenses: IExpense[];
  totalPages: number;
}

export default function useExpensesQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([EXPENSES_KEY, page], async () => {
    const resp = (await strapi.find(EXPENSES_KEY, {
      populate: ['type'],
      /* @ts-ignore*/
      page,
      filters: {
        status: STATUS_EXPENSE.APPROVED || STATUS_EXPENSE.PENDING,
      },
    })) as unknown as IExpensesResponse;
    setTotalPages?.(resp.pagination.pageCount!);
    return {
      expenses: resp.results,
      totalPages: resp.pagination.pageCount!,
    };
  });
}

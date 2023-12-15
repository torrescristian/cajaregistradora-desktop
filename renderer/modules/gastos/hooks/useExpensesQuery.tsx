import {
  IExpense,
  IExpensesResponse,
  STATUS_EXPENSE,
} from '@/modules/caja/interfaces/IExpense';
import { EXPENSES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface IProps {
  page: number;
}

interface IResponse {
  expenses: IExpense[];
  totalPages: number;
}

export default function useExpensesQuery({ page }: IProps) {
  return useQuery<IResponse>([EXPENSES_KEY, page], async () => {
    const resp = (await strapi.find(EXPENSES_KEY, {
      populate: ['type'],
      /* @ts-ignore*/
      page,
      filters: {
        status: STATUS_EXPENSE.APPROVED || STATUS_EXPENSE.PENDING,
      },
    })) as unknown as IExpensesResponse;
    return {
      expenses: resp.results,
      totalPages: resp.pagination.pageCount!,
    };
  });
}

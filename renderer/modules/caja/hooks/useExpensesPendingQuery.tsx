import { EXPENSES_KEY } from '@/modules/common/consts';
import {
  IExpense,
  IExpensesResponse,
  STATUS_EXPENSE,
} from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';

export default function useExpensesQuery() {
  const { cashBalance } = useActiveCashBalanceQuery();
  return useQuery<IExpense[]>([EXPENSES_KEY], async () => {
    const resp = (await strapi.find(EXPENSES_KEY, {
      populate: ['expense-types'],
      filters: {
        cashBalance: cashBalance?.id,
        status: STATUS_EXPENSE.PENDING,
      },
    })) as unknown as IExpensesResponse;
    return resp.results;
  });
}

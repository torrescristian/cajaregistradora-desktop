import { EXPENSES_KEY } from '@/modules/common/consts';
import { IExpense, IExpensesResponse } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';

export default function useCashBalanceExpensesQuery() {
  const { cashBalance } = useActiveCashBalanceQuery();
  return useQuery<IExpense[]>([EXPENSES_KEY, cashBalance?.id!], async () => {
    const resp = (await strapi.find(EXPENSES_KEY, {
      populate: ['type'],
      filters: {
        cashBalance: cashBalance?.id,
      },
    })) as unknown as IExpensesResponse;
    return resp.results;
  });
}

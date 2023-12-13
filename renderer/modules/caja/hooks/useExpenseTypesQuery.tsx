import { useQuery } from '@tanstack/react-query';
import { IExpenseType, IExpenseTypesResponse } from '../interfaces/IExpense';
import { EXPENSES_TYPE_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';

export default function useExpensesTypeQuery() {
  return useQuery<IExpenseType[]>([EXPENSES_TYPE_KEY], async () => {
    const resp = (await strapi.find(
      EXPENSES_TYPE_KEY,
    )) as unknown as IExpenseTypesResponse;
    return resp.results;
  });
}

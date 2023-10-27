import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';
import { getStockPerVariantsKey } from './useCreateVariantMutation';
import { getProductTypeQueryKey } from './useProductTypesQuery';
import { getProductsQueryKey } from './useProductsQuery';

export default function useCancelCashBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (cashBalanceId: number) => {
    const res = await strapi.update(getCashBalanceKey(), cashBalanceId, {
      completedAt: new Date(),
    });
    queryClient.invalidateQueries([getCashBalanceKey()]);
    queryClient.invalidateQueries([getStockPerVariantsKey()]);
    queryClient.invalidateQueries([getProductTypeQueryKey()]);
    queryClient.invalidateQueries([getProductsQueryKey()]);
    return res;
  });
}

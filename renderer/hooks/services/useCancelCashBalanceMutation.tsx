import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';

export default function useCancelCashBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (cashBalanceId: number) => {
    const res = await strapi.update(getCashBalanceKey(), cashBalanceId, {
      completedAt: new Date(),
    });
    queryClient.invalidateQueries([getCashBalanceKey()]);
    return res;
  });
}

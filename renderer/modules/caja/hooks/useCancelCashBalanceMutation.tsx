import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';

import { PRODUCTS_KEY, STOCK_PER_VARIANTS_KEY, PRODUCT_TYPE_KEY } from '@/modules/common/consts';

export default function useCancelCashBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (cashBalanceId: number) => {
    const res = await strapi.update(getCashBalanceKey(), cashBalanceId, {
      completedAt: new Date(),
    });
    queryClient.invalidateQueries([getCashBalanceKey()]);
    queryClient.invalidateQueries([STOCK_PER_VARIANTS_KEY]);
    queryClient.invalidateQueries([PRODUCT_TYPE_KEY]);
    queryClient.invalidateQueries([PRODUCTS_KEY]);
    return res;
  });
}

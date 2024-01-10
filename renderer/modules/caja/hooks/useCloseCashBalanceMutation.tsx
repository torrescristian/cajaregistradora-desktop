import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  PRODUCTS_KEY,
  STOCK_PER_VARIANTS_KEY,
  PRODUCT_TYPE_KEY,
  CASH_BALANCE_KEY,
} from '@/modules/common/consts';
import usePrintService from '@/modules/common/hooks/usePrintService';

export default function useCloseCashBalanceMutation() {
  const queryClient = useQueryClient();
  const { printCash } = usePrintService();

  return useMutation(async (cashBalanceId: number) => {
    const res = (await strapi.update(CASH_BALANCE_KEY, cashBalanceId, {
      completedAt: new Date(),
    })) as any;

    printCash(res.data.id);

    queryClient.invalidateQueries([CASH_BALANCE_KEY]);
    queryClient.invalidateQueries([STOCK_PER_VARIANTS_KEY]);
    queryClient.invalidateQueries([PRODUCT_TYPE_KEY]);
    queryClient.invalidateQueries([PRODUCTS_KEY]);
    return res;
  });
}

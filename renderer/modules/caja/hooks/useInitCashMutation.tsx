import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { CASH_BALANCE_KEY } from '@/modules/common/consts';

interface IProps {
  initialCashAmount: number;
}

export default function useInitCashMutation() {
  const queryClient = useQueryClient();
  const { userData } = useAuthState();

  return useMutation(async ({ initialCashAmount }: IProps) => {
    const res = await strapi.create(CASH_BALANCE_KEY, {
      completed_at: null,
      initialCashAmount,
      newCashAmount: initialCashAmount,
      seller: userData!.id,
      tickets: [],
      digitalCashAmount: 0,
    });

    queryClient.invalidateQueries([CASH_BALANCE_KEY]);

    return res;
  });
}

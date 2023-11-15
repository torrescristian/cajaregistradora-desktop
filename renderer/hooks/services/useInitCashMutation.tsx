import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';
import { useAuthState } from '@/state/AuthContext';

interface IProps {
  initialCashAmount: number;
}

export default function useInitCashMutation() {
  const queryClient = useQueryClient();
  const { userData } = useAuthState();

  return useMutation(async ({ initialCashAmount }: IProps) => {
    console.log({ userData });
    const res = await strapi.create(getCashBalanceKey(), {
      completed_at: null,
      initialCashAmount,
      newCashAmount: 0,
      seller: userData!.id,
      tickets: [],
    });

    queryClient.invalidateQueries([getCashBalanceKey()]);

    return res;
  });
}

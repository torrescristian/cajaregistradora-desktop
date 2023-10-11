import strapi from '@/libs/strapi';
import { getErrorMessage } from '@/libs/utils';
import {
  ICashBalanceExpanded,
  ICashBalancePage,
} from '@/interfaces/ICashBalance';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from '@/contexts/AuthContext';

export const getCashBalanceKey = () => 'cash-balances';

const parseCashBalanceFacade = (
  cashBalanceResponse: ICashBalancePage,
): ICashBalanceExpanded => {
  const cashBalance = cashBalanceResponse.results[0];
  return {
    id: cashBalance.id,
    completedAt: cashBalance.completedAt,
    initialCashAmount: cashBalance.initialCashAmount,
    newCashAmount: cashBalance.newCashAmount,
    seller: cashBalance.seller,
    ticket: cashBalance.ticket,
    totalAmount: cashBalance.totalAmount,
  };
};

export default function useActiveCashBalanceQuery() {
  const router = useRouter();
  const { userData } = useAuthState();

  const { data, isLoading, isError, isSuccess } =
    useQuery<ICashBalanceExpanded | null>(
      [getCashBalanceKey(), userData?.id],
      async () => {
        try {
          const res = (await strapi.find(getCashBalanceKey(), {
            filters: {
              seller: userData!.id,
              completedAt: {
                $null: true,
              },
            },
            populate: ['seller'],
          })) as unknown as ICashBalancePage;

          if (!res) return null;
          return parseCashBalanceFacade(res);
        } catch (error: any) {
          // console.log('🚀 ~ file: useCashBalance.tsx:47 ~ error:', error);
          if ([401, 403].includes(getErrorMessage(error).status)) {
            router.push('/');

            return null;
          }

          return null;
        }
      },
    );

  const cashBalance = data || null;

  return {
    cashBalance,
    isLoading,
    isError,
    isSuccess,
    cashIsActive: Boolean(cashBalance),
  };
}

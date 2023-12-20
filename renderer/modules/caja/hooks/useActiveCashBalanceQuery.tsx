import strapi from '@/modules/common/libs/strapi';
import { getErrorMessage } from '@/modules/common/libs/utils';
import {
  ICashBalanceExpanded,
  ICashBalancePage,
} from '@/modules/caja/interfaces/ICashBalance';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { CASH_BALANCE_KEY } from '@/modules/common/consts';

interface IProps {
  cashBalance: ICashBalanceExpanded;
  todayCashBalances: ICashBalanceExpanded[];
}

export default function useActiveCashBalanceQuery() {
  const router = useRouter();
  const { userData } = useAuthState();
  const { data, isLoading, isError, isSuccess } = useQuery<IProps | null>(
    [CASH_BALANCE_KEY, userData?.id],
    async () => {
      try {
        const today = new Date();

        const res = (await strapi.find(CASH_BALANCE_KEY, {
          filters: {
            seller: userData!.id,
            $or: [
              {
                completedAt: { $null: true },
              },
              {
                completedAt: {
                  $gt: today.setHours(0, 0, 0, 0),
                },
              },
            ],
          },
          populate: ['cash-balances', 'seller', 'ticket', 'order'],
        })) as unknown as ICashBalancePage;

        if (!res) return null;
        const todayCashBalances = res.results;
        const cashBalance = todayCashBalances.filter(
          (cashBalance) => cashBalance.completedAt === null,
        )[0];
        return { cashBalance, todayCashBalances };
      } catch (error: any) {
        if ([401, 403].includes(getErrorMessage(error).status)) {
          return null;
        }

        return null;
      }
    },
  );

  const cashBalance = data?.cashBalance || null;
  const todayCashBalances =
    data?.todayCashBalances.filter((cashBalance) => cashBalance.completedAt) ||
    [];

  return {
    cashBalance,
    todayCashBalances,
    isLoading,
    isError,
    isSuccess,
    cashIsActive: Boolean(cashBalance),
  };
}

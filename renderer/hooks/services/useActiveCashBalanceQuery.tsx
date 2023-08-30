import strapi from '@/libs/strapi';
import { getErrorMessage } from '@/libs/utils';
import { ICashBalanceExpanded, ICashBalancePage } from '@/interfaces/ICashBalance';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from '@/contexts/AuthContext';


export const getCashBalanceKey = () => 'cash-balances';

const parseCashBalanceFacade = (cashBalanceResponse: ICashBalancePage): ICashBalanceExpanded => {
  const cashBalance = cashBalanceResponse.data[0];
  return {
    id : cashBalance.id,
    completedAt: cashBalance.attributes.completedAt,
    initialCashAmount: cashBalance.attributes.initialCashAmount,
    newCashAmount: cashBalance.attributes.newCashAmount,
    seller: cashBalance.attributes.seller,
    ticket: cashBalance.attributes.ticket,
    totalAmount: cashBalance.attributes.totalAmount
  }
}

export default function useActiveCashBalanceQuery() {
  const router = useRouter();
  const { userData } = useAuthState()


  const { data, isLoading, isError, isSuccess } = useQuery<ICashBalanceExpanded| null>(
    [getCashBalanceKey()],
    async () => {
      try {
        const res = (await strapi.find(getCashBalanceKey(), {
           filters: {
            seller: userData!.id,
            completedAt: {
              $null : true
             }  
          },
          populate: ['*']
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


  return { cashBalance, isLoading, isError, isSuccess, cashIsActive: Boolean(cashBalance) };
}

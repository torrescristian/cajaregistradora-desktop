import { useMutation, useQueryClient } from '@tanstack/react-query';
import { INewAddBalance } from '../interfaces/INewAddBalance';
import strapi from '@/modules/common/libs/strapi';
import {
  DEPOSITS_KEY,
  EXPENSES_KEY,
  CASH_BALANCE_KEY,
} from '@/modules/common/consts';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';
import { toast } from 'react-toastify';
import { ICashBalance } from '../interfaces/ICashBalance';
import { useAuthState } from '@/modules/common/contexts/AuthContext';

export default function useCreateCashAddBalanceMutation() {
  const { cashBalance } = useActiveCashBalanceQuery();
  const { isOwner } = useAuthState();
  const queryClient = useQueryClient();
  return useMutation(async (newAddBalance: INewAddBalance) => {
    try {
      if (!cashBalance?.id) {
        toast.error('la caja no esta activa');
        throw new Error('la caja no esta activa');
      }

      const res = await strapi.create(DEPOSITS_KEY, {
        reason: newAddBalance.reason,
        createdAt: newAddBalance.createdAt,
        cashBalance: cashBalance.id,
        amount: Number(newAddBalance.amount),
      });

      await strapi.update(CASH_BALANCE_KEY, cashBalance.id!, {
        newCashAmount:
          Number(cashBalance.newCashAmount) + Number(newAddBalance.amount),
      } as Partial<ICashBalance>);

      toast.success('Saldo actualizado');
      queryClient.invalidateQueries([DEPOSITS_KEY]);
      queryClient.invalidateQueries([CASH_BALANCE_KEY]);
    } catch (e) {
      toast.error(`Error al registrar el saldo: ${e}`);
    }
  });
}

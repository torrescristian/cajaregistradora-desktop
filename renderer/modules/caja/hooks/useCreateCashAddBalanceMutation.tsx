import { useMutation, useQueryClient } from '@tanstack/react-query';
import { INewAddBalance, STATUS_ADD_BALANCE } from '../interfaces/INewAddBalance';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY, ADD_BALANCE_KEY } from '@/modules/common/consts';
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

      const res = await strapi.create(CASH_BALANCE_KEY, {
        amount: Number(newAddBalance.amount),
        reason: newAddBalance.reason,
        createdAt: newAddBalance.createdAt,
        cashBalance: cashBalance.id,
        type: newAddBalance.type,
        status: isOwner ? STATUS_ADD_BALANCE.APPROVED : STATUS_ADD_BALANCE.PENDING,
      });

      if (isOwner) {
        await strapi.update(CASH_BALANCE_KEY, cashBalance.id!, {
          newCashAmount: Math.max(
            cashBalance.newCashAmount + newAddBalance.amount,
            0,
          ),
        } as Partial<ICashBalance>);
      }

      if (!isOwner) {
        toast.info('Se enviara a aprobacion');
        queryClient.invalidateQueries([CASH_BALANCE_KEY]);
        return null;
      }

      toast.success('Gasto registrado');
      queryClient.invalidateQueries([CASH_BALANCE_KEY]);
      return res;
    } catch (e) {
      toast.error(`Error al registrar gasto: ${e}`);
    }
  });
}

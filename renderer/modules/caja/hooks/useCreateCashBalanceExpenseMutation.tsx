import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IExpense, STATUS_EXPENSE } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY, EXPENSES_KEY } from '@/modules/common/consts';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';
import { toast } from 'react-toastify';
import { ICashBalance } from '../interfaces/ICashBalance';
import { useAuthState } from '@/modules/common/contexts/AuthContext';

export default function useCreateCashBalanceExpenseMutation() {
  const { cashBalance } = useActiveCashBalanceQuery();
  const { isOwner } = useAuthState();
  const queryClient = useQueryClient();
  return useMutation(async (expense: IExpense) => {
    try {
      if (!cashBalance?.id) {
        toast.error('la caja no esta activa');
        throw new Error('la caja no esta activa');
      }
      const res = await strapi.create(EXPENSES_KEY, {
        amount: Number(expense.amount),
        reason: expense.reason,
        createdAt: expense.createdAt,
        cashBalance: cashBalance.id,
        type: expense.type,
        status: isOwner ? STATUS_EXPENSE.APPROVED : STATUS_EXPENSE.PENDING,
      });
      if (isOwner) {
        const returnMoney = await strapi.update(
          CASH_BALANCE_KEY,
          cashBalance.id!,
          {
            newCashAmount: Math.max(
              cashBalance.newCashAmount - expense.amount,
              0,
            ),
          } as Partial<ICashBalance>,
        );
      }

      if (!isOwner) {
        toast.info('Se enviara a aprobacion');
        queryClient.invalidateQueries([EXPENSES_KEY]);
        return null;
      }

      toast.success('Gasto registrado');
      queryClient.invalidateQueries([EXPENSES_KEY]);
      return res;
    } catch (e) {
      toast.error('Error al registrar gasto');
    }
  });
}

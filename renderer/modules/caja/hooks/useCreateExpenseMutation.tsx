import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IExpense } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY, EXPENSES_KEY } from '@/modules/common/consts';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';
import { toast } from 'react-toastify';
import { ICashBalance } from '../interfaces/ICashBalance';

export default function useCreateExpenseMutation() {
  const { cashBalance } = useActiveCashBalanceQuery();
  const queryClient = useQueryClient();
  return useMutation(async (expense: IExpense) => {
    try {
      if (!cashBalance?.id) {
        toast.error('la caja no esta activa');
        throw new Error('la caja no esta activa');
      }
      const res = await strapi.create(EXPENSES_KEY, {
        amount: expense.amount,
        reason: expense.reason,
        createdAt: expense.createdAt,
        cashBalance: cashBalance.id,
      });
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
      toast.success('Gasto registrado');
      queryClient.invalidateQueries([EXPENSES_KEY]);
      return res;
    } catch (e) {
      toast.error('Error al registrar gasto');
    }
  });
}

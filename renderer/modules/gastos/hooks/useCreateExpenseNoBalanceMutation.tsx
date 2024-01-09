import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';
import { ICashBalance } from '@/modules/caja/interfaces/ICashBalance';
import { IExpense, STATUS_EXPENSE } from '@/modules/caja/interfaces/IExpense';
import { CASH_BALANCE_KEY, EXPENSES_KEY } from '@/modules/common/consts';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface IProps {
  discountCashBalance: boolean;
  expense: IExpense;
}

export default function useCreateExpenseNoBalanceMutation() {
  const queryClient = useQueryClient();
  const { cashBalance } = useActiveCashBalanceQuery();
  const { isOwner } = useAuthState();
  return useMutation(async ({ discountCashBalance, expense }: IProps) => {
    const res = await strapi.create(EXPENSES_KEY, {
      amount: Number(expense.amount),
      reason: expense.reason,
      createdAt: expense.createdAt,
      type: expense.type,
      status: STATUS_EXPENSE.APPROVED,
      cashBalance: null,
    });
    if (discountCashBalance) {
      if (isOwner) {
        const returnMoney = await strapi.update(
          CASH_BALANCE_KEY,
          cashBalance?.id!,
          {
            newCashAmount: Math.max(
              cashBalance!.newCashAmount - expense.amount,
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
    }
    toast.success('Gasto registrado');
    queryClient.invalidateQueries([EXPENSES_KEY]);
    return res;
  });
}

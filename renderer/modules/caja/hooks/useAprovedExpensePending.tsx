import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IExpense, STATUS_EXPENSE } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { CASH_BALANCE_KEY, EXPENSES_KEY } from '@/modules/common/consts';
import { toast } from 'react-toastify';
import useActiveCashBalanceQuery from './useActiveCashBalanceQuery';

interface IProps {
  expense: IExpense;
}

export default function useAprovedExpensePending() {
  const queryClient = useQueryClient();
  return useMutation(async ({ expense }: IProps) => {
    try {
      const resp = await strapi.update(EXPENSES_KEY, expense.id!, {
        status: STATUS_EXPENSE.APPROVED,
      });
      const returnMoney = await strapi.update(
        CASH_BALANCE_KEY,
        expense.cashBalance?.id!,
        {
          newCashAmount: Math.max(
            expense.cashBalance!.newCashAmount - expense.amount,
            0,
          ),
        },
      );

      toast.success('Gasto aprobado');
      queryClient.invalidateQueries([EXPENSES_KEY]);
      return resp;
    } catch (e) {
      toast.error('Error al aprobar el gasto');
    }
  });
}

import { IExpense, STATUS_EXPENSE } from '@/modules/caja/interfaces/IExpense';
import { EXPENSES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function useCreateExpenseNoBalanceMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (expense: IExpense) => {
    const res = await strapi.create(EXPENSES_KEY, {
      amount: Number(expense.amount),
      reason: expense.reason,
      createdAt: expense.createdAt,
      type: expense.type,
      status: STATUS_EXPENSE.APPROVED,
      cashBalance: null,
    });

    toast.success('Gasto registrado');
    queryClient.invalidateQueries([EXPENSES_KEY]);
    return res;
  });
}

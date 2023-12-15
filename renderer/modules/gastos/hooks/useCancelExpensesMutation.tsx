import { IExpense, STATUS_EXPENSE } from '@/modules/caja/interfaces/IExpense';
import { EXPENSES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useCancelExpensesMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (expense: IExpense) => {
    try {
      const res = await strapi.update(EXPENSES_KEY, expense.id!, {
        status: STATUS_EXPENSE.REJECTED,
      });
      toast.success('Se elimino el gasto');
      queryClient.invalidateQueries([EXPENSES_KEY]);
      return res;
    } catch (error) {
      toast.error('No se pudo eliminar el gasto');
    }
  });
}

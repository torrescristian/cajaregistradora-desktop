import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IExpense, STATUS_EXPENSE } from '../interfaces/IExpense';
import strapi from '@/modules/common/libs/strapi';
import { EXPENSES_KEY } from '@/modules/common/consts';
import { toast } from 'react-toastify';

interface IProps {
  expense: IExpense;
}

export default function useRejectdExpensePending() {
  const queryClient = useQueryClient();
  return useMutation(async ({ expense }: IProps) => {
    try {
      const resp = await strapi.update(EXPENSES_KEY, expense.id!, {
        status: STATUS_EXPENSE.REJECTED,
      });
      toast.info('Gasto Rechazado');
      queryClient.invalidateQueries([EXPENSES_KEY]);
      return resp;
    } catch (e) {
      toast.error('Error al rechazar el gasto');
    }
  });
}

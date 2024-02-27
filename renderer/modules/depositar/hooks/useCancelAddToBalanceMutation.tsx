import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import { DEPOSITS_KEY, CASH_BALANCE_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useActiveCashBalanceQuery from '@/modules/caja/hooks/useActiveCashBalanceQuery';

export function useCancelAddToBalanceMutation () {
    const queryClient = useQueryClient();
    const { cashBalance } = useActiveCashBalanceQuery();
    return useMutation(async (AddToBalance: INewAddBalance) => {
        try {
          if (!cashBalance?.id) {
        toast.error('la caja no esta activa');
        throw new Error('la caja no esta activa');
      }
        await strapi.update(CASH_BALANCE_KEY, cashBalance.id!, {
          newCashAmount: Math.max(
            cashBalance.newCashAmount - AddToBalance.amount,
            0,
          ),
        } as Partial<INewAddBalance>);
          // ELIMINAR REGISTRO DE LA TABLA DEPOSITO
          const res = await strapi.update(DEPOSITS_KEY, AddToBalance.id!, {
            reason: 'ELIMINADO'
          });
          toast.success('Se elimino el gasto');
          queryClient.invalidateQueries([DEPOSITS_KEY]);
          queryClient.invalidateQueries([CASH_BALANCE_KEY]);
          return res;
        } catch (error) {
          toast.error('No se pudo eliminar el gasto');
        }
      });
}
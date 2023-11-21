import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPromoQueryKey } from './usePromoQuery';
import { PROMO_STATUS } from '@/modules/promos/interfaces/IPromo';
import { toast } from 'react-toastify';

export default function useCancelPromoMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (id: number) => {
    try {
      const res = await strapi.update(getPromoQueryKey(), id, {
        status: PROMO_STATUS.DISABLED,
      });
      queryClient.invalidateQueries([getPromoQueryKey()]);
      toast.success('Promo Cancelada');
      return res;
    } catch (error) {
      toast.error('No se pudo cancelar la promo');
    }
  });
}

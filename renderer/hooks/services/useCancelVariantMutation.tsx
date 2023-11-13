import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getVariantsQueryKey } from './useCreateVariantMutation';
import { VARIANT_STATUS } from '@/interfaces/IVariants';
import { toast } from 'react-toastify';

export default function useCancelVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (VariantId: number) => {
    try {
      const res = strapi.update(getVariantsQueryKey(), VariantId, {
        status: VARIANT_STATUS.DISABLED,
      });
      queryClient.invalidateQueries([getVariantsQueryKey()]);
      toast.success('Variante Eliminada');
      return res;
    } catch (error) {
      toast.error('Error al eliminar la variante');
    }
  });
}

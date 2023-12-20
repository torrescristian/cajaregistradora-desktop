import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_STATUS } from '@/modules/products/interfaces/IProduct';
import { toast } from 'react-toastify';
import { PRODUCTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';

export default function useCancelVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (variantId: number) => {
    try {
      const res = await strapi.update(VARIANTS_KEY, variantId, {
        status: PRODUCT_STATUS.DISABLED,
      });
      toast.info('Variante eliminada');
      queryClient.invalidateQueries([VARIANTS_KEY]);
      return res;
    } catch (error) {
      toast.error(`Error al eliminar la variante con código ${variantId}`);
    }
  });
}

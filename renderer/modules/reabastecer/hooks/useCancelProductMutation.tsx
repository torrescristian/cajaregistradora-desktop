import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_STATUS } from '@/modules/products/interfaces/IProduct';
import { toast } from 'react-toastify';
import { PRODUCTS_KEY } from '@/modules/common/consts';

export default function useCancelProductMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (porductId: number) => {
    try {
      const res = await strapi.update(PRODUCTS_KEY, porductId, {
        status: PRODUCT_STATUS.DISABLED,
      });
      queryClient.invalidateQueries([PRODUCTS_KEY]);
      toast.success('Producto Eliminado');
      return res;
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  });
}

import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import { PRODUCT_STATUS } from '@/interfaces/IProduct';
import { toast } from 'react-toastify';

export default function useCancelProductMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (porductId: number) => {
    try {
      const res = await strapi.update(getProductsQueryKey(), porductId, {
        status: PRODUCT_STATUS.DISABLED,
      });
      queryClient.invalidateQueries([getProductsQueryKey()]);
      toast.success('Producto Eliminado');
      return res;
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  });
}

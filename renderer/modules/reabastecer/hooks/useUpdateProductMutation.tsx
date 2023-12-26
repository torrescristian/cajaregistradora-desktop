import { PRODUCTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { IProductPayload } from '@/modules/products/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductPayload>) => {
    try {
      const response = await strapi.update(PRODUCTS_KEY, product.id!, product);

      queryClient.invalidateQueries([PRODUCTS_KEY]);
      queryClient.invalidateQueries([VARIANTS_KEY]);
      toast.success('Producto actualizado');
      return response;
    } catch (e) {
      toast.error('Error al actualizar el producto');
    }
  });
}

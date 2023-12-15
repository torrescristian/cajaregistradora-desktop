import { PRODUCTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { IProductPayload } from '@/modules/products/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductPayload>) => {
    const response = await strapi.update(PRODUCTS_KEY, product.id!, product);

    queryClient.invalidateQueries([PRODUCTS_KEY]);
    return response;
  });
}

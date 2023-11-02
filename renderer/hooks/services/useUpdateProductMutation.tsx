import strapi from '@/libs/strapi';
import { IProductPayload } from '@/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductPayload>) => {
    const response = strapi.update(getProductsQueryKey(), product.id!, product);

    queryClient.invalidateQueries([getProductsQueryKey()]);
    return response;
  });
}

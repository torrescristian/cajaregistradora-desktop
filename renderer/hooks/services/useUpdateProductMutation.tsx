import strapi from '@/libs/strapi';
import { IProduct, IProductPayload } from '@/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import { getVariantsQueryKey } from './useCreateVariantMutation';
import { getProductTypeQueryKey } from './useProductTypesQuery';

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductPayload>) => {
    const response = strapi.update(getProductsQueryKey(), product.id!, product);

    queryClient.invalidateQueries([getProductsQueryKey()]);
    return response;
  });
}

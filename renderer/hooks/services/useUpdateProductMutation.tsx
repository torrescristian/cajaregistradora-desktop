import strapi from '@/libs/strapi';
import { IProduct } from '@/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';

// FUNCTIONS
const parseProductToPayload = (
  product: Partial<IProduct>,
): Partial<IProduct> => {
  const { id, name, image } = product;

  return {
    id,
    name,
    image,
  };
};

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProduct>) => {
    const response = strapi.update(
      'products',
      product.id!,
      parseProductToPayload(product),
    );

    queryClient.invalidateQueries([getProductsQueryKey()]);
    

    return response;
  });
}

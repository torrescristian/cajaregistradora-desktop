import strapi from '@/libs/strapi';
import IProductUI, { IProduct } from '@/interfaces/IProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';

// FUNCTIONS
const parseProductToPayload = (
  product: Partial<IProductUI>,
): Partial<IProduct> => {
  const {
    id,
    name,
    image,
  } = product;

  return {
    id,
    name,
    image,
  };
};

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductUI>) => {
    const response = strapi.update(
      'products',
      product.id!,
      parseProductToPayload(product),
    );

    queryClient.invalidateQueries([getProductsQueryKey()]);

    return response;
  });
}

import { IProductType } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductTypeQueryKey } from './useProductTypesQuery';

export default function useCreateProductType() {
  const queryClient = useQueryClient();
  return useMutation(async (productType: IProductType) => {
    const resp = await strapi.create(getProductTypeQueryKey(), productType);
    queryClient.invalidateQueries([getProductTypeQueryKey()]);
    return resp as unknown as IProductType;
  });
}

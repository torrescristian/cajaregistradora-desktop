import { ICategoryPayload } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategoryQueryKey } from './useCategoryQuery';
import { IStrapiSingleResponse } from '@/interfaces/utils';

export default function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (category: ICategoryPayload) => {
    const resp = await strapi.create(getCategoryQueryKey(), category);
    queryClient.invalidateQueries([getCategoryQueryKey()]);
    return resp as unknown as IStrapiSingleResponse<ICategoryPayload>;
  });
}

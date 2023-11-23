import { ICategoryPayload } from '@/modules/categorias/interfaces/ICategory';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';
import { CATEGORIES_KEY } from '@/modules/common/consts';

export default function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (category: ICategoryPayload) => {
    const resp = await strapi.create(CATEGORIES_KEY, category);
    queryClient.invalidateQueries([CATEGORIES_KEY]);
    return resp as unknown as IStrapiSingleResponse<ICategoryPayload>;
  });
}

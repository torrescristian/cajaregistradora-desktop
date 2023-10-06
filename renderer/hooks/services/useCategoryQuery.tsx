import { useQuery } from '@tanstack/react-query';
import { ICategory, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';

export const getCategoryQueryKey = () => 'categories';

export default function useCategoryQuery() {
  return useQuery<ICategory[]>([getCategoryQueryKey()], async () => {
    const resp = (await strapi.find(getCategoryQueryKey(), {
      populate: ['variants'],
    })) as unknown as ICategoryResponse;
    return resp.results;
  });
}

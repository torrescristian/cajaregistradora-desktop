import { useQuery } from '@tanstack/react-query';
import { ICategoryExpanded, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';

export const getCategoryQueryKey = () => 'categories';

export default function useCategoryQuery() {
  return useQuery<ICategoryExpanded[]>([getCategoryQueryKey()], async () => {
    const resp = (await strapi.find(getCategoryQueryKey(), {
      populate: ['variants', 'variants.product', 'variants.stock_per_variant'],
    })) as unknown as ICategoryResponse;
    return resp.results;
  });
}

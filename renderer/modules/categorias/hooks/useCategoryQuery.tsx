import { useQuery } from '@tanstack/react-query';
import {
  ICategoryExpanded,
  ICategoryResponse,
} from '@/modules/categorias/interfaces/ICategory';
import strapi from '@/modules/common/libs/strapi';
import { CATEGORIES_KEY } from '@/modules/common/consts';

export default function useCategoryQuery() {
  return useQuery<ICategoryExpanded[]>([CATEGORIES_KEY], async () => {
    const resp = (await strapi.find(CATEGORIES_KEY, {
      populate: ['variants', 'variants.product', 'variants.stock_per_variant'],
    })) as unknown as ICategoryResponse;
    return resp.results;
  });
}

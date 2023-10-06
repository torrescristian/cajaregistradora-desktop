import { IPromo, IPromoResponse } from '@/interfaces/IPromo';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getPromoQueryKey = () => 'promos';

export default function usePromoQuery() {
  return useQuery<IPromo[]>([getPromoQueryKey()], async () => {
    const resp = (await strapi.find(getPromoQueryKey(), {
      populate: [
        'categories',
        'categories.variants.product',
        'categories.category.variants.product',
        'variants',
        'variants.variant.product',
      ],
    })) as unknown as IPromoResponse;
    return resp.results;
  });
}

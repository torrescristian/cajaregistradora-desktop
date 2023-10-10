import {IPromoExpanded, IPromoResponse } from '@/interfaces/IPromo';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getPromoQueryKey = () => 'promos';

export default function usePromoQuery() {
  return useQuery<IPromoExpanded[]>([getPromoQueryKey()], async () => {
    const resp = (await strapi.find(getPromoQueryKey(), {
      populate: [
        'categories',
        'categories.category.variants.product',
        'categories.category.variants.stock_per_variant',
        'variants',
        'variants.variant.product',
        'variants.variant.stock_per_variant',
      ],
    })) as unknown as IPromoResponse;
    return resp.results;
  });
}


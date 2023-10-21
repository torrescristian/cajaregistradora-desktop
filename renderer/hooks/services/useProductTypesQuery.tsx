import { IProductType, IProductTypeResponse } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getProductTypeQueryKey = () => 'product-types';

export default function useProductTypeQuery() {
  return useQuery<IProductType[]>([getProductTypeQueryKey()], async () => {
    const res = (await strapi.find(getProductTypeQueryKey(), {
      populate: ['products'],
    })) as unknown as IProductTypeResponse;
    return res.results;
  });
}

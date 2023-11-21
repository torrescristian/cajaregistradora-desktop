import { IProductType, IProductTypeResponse } from '@/modules/products/interfaces/IProduct';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { PRODUCT_TYPE_KEY } from '@/modules/common/consts';


export default function useProductTypeQuery() {
  return useQuery<IProductType[]>([PRODUCT_TYPE_KEY], async () => {
    const res = (await strapi.find(PRODUCT_TYPE_KEY, {
      populate: ['products'],
      /* @ts-ignore */
      pageSize: 1000,
    })) as unknown as IProductTypeResponse;
    return res.results;
  });
}

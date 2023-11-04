import { ICoupon, ICouponResponse } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getCouponQueryKey = () => 'coupons';

export default function useCouponsQuery() {
  return useQuery<ICoupon[]>([getCouponQueryKey()], async () => {
    const resp = (await strapi.find(getCouponQueryKey(), {
      populate: ['discount', 'variant', 'variant.product','variant.product.type'],
      filters: {
        availableUses: {
          $gt: 0,
        },
      },
    })) as unknown as ICouponResponse;
    return resp.results;
  });
}

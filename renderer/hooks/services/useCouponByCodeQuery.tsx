import { ICoupon, ICouponResponse } from '@/interfaces/ICoupon';
import { useQuery } from '@tanstack/react-query';
import { getCouponQueryKey, parseCouponFacade } from './useCouponsQuery';
import strapi from '@/libs/strapi';

export default function useCouponByCodeQuery(code: string) {
  return useQuery<ICoupon>([getCouponQueryKey(), code], async () => {
    const resp = (await strapi.find(getCouponQueryKey(), {
      filters: {
        code,
      },
      populate: ['discount', 'variant', 'variant.product'],
    })) as unknown as ICouponResponse;
    return parseCouponFacade(resp)[0] || null;
  });
}

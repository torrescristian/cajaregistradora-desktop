import { ICoupon, ICouponResponse } from '@/modules/cupones/interfaces/ICoupon';
import { useQuery } from '@tanstack/react-query';

import strapi from '@/modules/common/libs/strapi';
import { COUPONS_KEY } from '@/modules/common/consts';

export default function useCouponByCodeQuery(code: string) {
  return useQuery<ICoupon>([COUPONS_KEY, code], async () => {
    const resp = (await strapi.find(COUPONS_KEY, {
      filters: {
        code,
      },
      populate: ['discount', 'variant', 'variant.product'],
    })) as unknown as ICouponResponse;
    return resp.results[0] || null;
  });
}

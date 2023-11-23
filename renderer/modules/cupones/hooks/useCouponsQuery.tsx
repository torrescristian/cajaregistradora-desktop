import { ICoupon, ICouponResponse } from '@/modules/cupones/interfaces/ICoupon';
import { COUPONS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export default function useCouponsQuery() {
  return useQuery<ICoupon[]>([COUPONS_KEY], async () => {
    const resp = (await strapi.find(COUPONS_KEY, {
      populate: [
        'discount',
        'variant',
        'variant.product',
        'variant.product.type',
      ],
      filters: {
        availableUses: {
          $gt: 0,
        },
      },
    })) as unknown as ICouponResponse;
    return resp.results;
  });
}

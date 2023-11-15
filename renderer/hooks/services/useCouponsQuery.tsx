import { ICoupon, ICouponPayload, ICouponResponse } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { db } from '@/state/db';
import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

export const getCouponQueryKey = () => 'coupons';

export const useCouponOffline = () => {
  const coupon = useLiveQuery(
    () => db.coupons.toArray() as unknown as ICoupon[],
  );
  if (!coupon) return null;

  return coupon;
};

export default function useCouponsQuery() {
  return useQuery<ICoupon[]>([getCouponQueryKey()], async () => {
    const resp = (await strapi.find(getCouponQueryKey(), {
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
    await db.coupons.bulkPut(
      resp.results.map((coupon) => ({
        ...coupon,
        id: coupon.id,
        availableUses: coupon.availableUses,
        code: coupon.code,
        discount: coupon.discount,
        dueDate: coupon.dueDate,
        maxAmount: coupon.maxAmount,
        variant: coupon.variant?.id!,
      })),
    );
    return resp.results;
  });
}

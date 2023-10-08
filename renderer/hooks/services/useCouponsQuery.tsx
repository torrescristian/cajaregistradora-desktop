import { ICoupon, ICouponResponse } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { getUrlFromImage } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';

export const getCouponQueryKey = () => 'coupons';

export const parseCouponFacade = (
  couponResponse: ICouponResponse,
): ICoupon[] => {
  return couponResponse.results.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    discount: coupon.discount,
    dueDate: coupon.dueDate,
    maxAmount: coupon.maxAmount,
    variant: coupon.variant?.data
      ? {
          name: coupon.variant.data.attributes.name,
          id: coupon.variant.data.id,
          product: {
            id: coupon.variant.data.attributes.product.data.id,
            name: coupon.variant.data.attributes.product.data.attributes.name,
            type: coupon.variant.data.attributes.product.data.attributes.type,
            image: getUrlFromImage(
              coupon.variant.data.attributes.product.data.attributes.image,
            ),
          },
        }
      : null,
    availableUses: coupon.availableUses,
  }));
};

export default function useCouponsQuery() {
  return useQuery<ICoupon[]>([getCouponQueryKey()], async () => {
    const resp = (await strapi.find(getCouponQueryKey(), {
      populate: ['discount', 'variant', 'variant.product'],
      filters: {
        availableUses: {
          $gt: 0,
        },
      },
    })) as unknown as ICouponResponse;
    return parseCouponFacade(resp);
  });
}

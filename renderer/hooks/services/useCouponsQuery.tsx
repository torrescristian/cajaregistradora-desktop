import { ICoupon, ICouponResponse } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { getUrlFromImage } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';

export const getCouponQueryKey = () => 'coupons';

export const parseCouponFacade = (
  couponResponse: ICouponResponse,
): ICoupon[] => {
  return couponResponse.data.map((coupon) => ({
    id: coupon.id,
    code: coupon.attributes.code,
    discount: coupon.attributes.discount,
    dueDate: coupon.attributes.dueDate,
    maxAmount: coupon.attributes.maxAmount,
    variant: coupon.attributes.variant?.data
      ? {
          name: coupon.attributes.variant.data.attributes.name,
          id: coupon.attributes.variant.data.id,
          product: {
            id: coupon.attributes.variant.data.attributes.product.data.id,
            name: coupon.attributes.variant.data.attributes.product.data
              .attributes.name,
            type: coupon.attributes.variant.data.attributes.product.data
              .attributes.type,
            image: getUrlFromImage(
              coupon.attributes.variant.data.attributes.product.data.attributes
                .image,
            ),
          },
        }
      : null,
    availableUses: coupon.attributes.availableUses,
  }));
};

export default function useCouponsQuery() {
  return useQuery<ICoupon[]>([getCouponQueryKey()], async () => {
    const resp = (await strapi.find(getCouponQueryKey(), {
      populate: ['discount', 'variant', 'variant.product'],
      filters:{
        availableUses: {
          $gt:0
        }
      }
    })) as unknown as ICouponResponse;
    return parseCouponFacade(resp);
  });
}

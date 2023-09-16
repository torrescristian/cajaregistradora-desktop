import { ICoupon } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';
import { getCouponQueryKey } from './useCouponQuery';

export default function useCreateCouponMutation() {
  return useMutation(async (coupon: ICoupon) => {
    const resp = await strapi.create(getCouponQueryKey(), coupon);
    return resp;
  });
}

import { ICoupon } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCouponQueryKey } from './useCouponQuery';

export default function useCreateCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (coupon: ICoupon) => {
    const resp = await strapi.create(getCouponQueryKey(), coupon);
    queryClient.invalidateQueries([getCouponQueryKey()]);
    return resp;
  });
}

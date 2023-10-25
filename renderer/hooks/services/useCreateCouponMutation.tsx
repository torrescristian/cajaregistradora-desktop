import { ICouponPayload } from '@/interfaces/ICoupon';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCouponQueryKey } from './useCouponsQuery';

export default function useCreateCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (coupon: ICouponPayload) => {
    const resp = await strapi.create(getCouponQueryKey(), coupon);
    queryClient.invalidateQueries([getCouponQueryKey()]);
    return resp;
  });
}

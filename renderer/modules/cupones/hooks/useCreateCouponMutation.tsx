import { ICouponPayload } from '@/modules/cupones/interfaces/ICoupon';
import { COUPONS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (coupon: ICouponPayload) => {
    const resp = await strapi.create(COUPONS_KEY, coupon);
    queryClient.invalidateQueries([COUPONS_KEY]);
    return resp;
  });
}

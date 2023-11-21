import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import { COUPONS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useCancelCouponMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (couponId: number) => {
    const resp = await strapi.update(COUPONS_KEY, couponId, {
      availableUses: 0,
    } as Partial<ICoupon>);
    queryClient.invalidateQueries([COUPONS_KEY]);
    return resp;
  });
}

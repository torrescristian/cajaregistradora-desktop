import { ICouponPayload } from '@/interfaces/ICoupon';
import { db } from '@/state/db';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getCouponQueryKey } from './useCouponsQuery';

export default function useCreateCouponOffline() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async (coupon: ICouponPayload) => {
    setIsLoading(true);
    await db.coupons.add(coupon);
    setIsLoading(false);
    queryClient.invalidateQueries([getCouponQueryKey()]);
  };
  return { mutate,isLoading };
}

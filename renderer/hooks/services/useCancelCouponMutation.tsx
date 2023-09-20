import { ICoupon } from "@/interfaces/ICoupon";
import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCouponQueryKey } from "./useCouponsQuery";


export default function useCancelCouponMutation() {
    const queryClient = useQueryClient();

    return useMutation(async (couponId: number) => {
        const resp = await strapi.update(getCouponQueryKey(), couponId, {
            availableUses: 0
        } as Partial<ICoupon>)
        queryClient.invalidateQueries([getCouponQueryKey()])
        return resp;
    })
}


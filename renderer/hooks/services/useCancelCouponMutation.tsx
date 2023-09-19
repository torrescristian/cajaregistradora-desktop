/* import strapi from "@/libs/strapi";
import { useMutation } from "@tanstack/react-query";


export default function useCancelCouponMutation() {
    return useMutation(async (couponId: number) => {
        const resp = await strapi.update('coupons', couponId)
        return resp;
    })
}
 */
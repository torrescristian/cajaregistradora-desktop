import { IPromo } from "@/interfaces/IPromo";
import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPromoQueryKey } from "./usePromoQuery";

export default function useUpdatePromo (){
    const queryClient = useQueryClient();
    return useMutation(async (promo : IPromo) => {
        const res = await strapi.update(getPromoQueryKey(),promo.id!,{
            ...promo
        })
        queryClient.invalidateQueries([getPromoQueryKey()])
        return res;
    })
}
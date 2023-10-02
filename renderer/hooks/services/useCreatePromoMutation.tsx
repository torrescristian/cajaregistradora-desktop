import { IPromoPayload } from "@/interfaces/IPromo";
import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPromoQueryKey } from "./usePromoQuery";

export default function useCreatePromoMutation(){
    const queryClient = useQueryClient();
    return useMutation(async (promo : IPromoPayload)=>{
        const resp = await strapi.create(getPromoQueryKey(),promo);
        queryClient.invalidateQueries([getPromoQueryKey()]);
        return resp;
    })    
}
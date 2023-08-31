import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getClientsQueryKey } from "./useClientQuery";
import IClient from "@/interfaces/IClient";


export default function useCreateOrderMutation() {
    const queryClient = useQueryClient();
    
    return useMutation(async (client : IClient) => {
        const resp = await strapi.create(getClientsQueryKey(), client)
        queryClient.invalidateQueries([getClientsQueryKey()])
        return resp;
    })

}
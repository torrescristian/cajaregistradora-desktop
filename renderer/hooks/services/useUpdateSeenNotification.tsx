import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotificationQueryKey } from "./useNotificationQuery";
import { INotificationResponse } from "@/interfaces/INotification";

function useUpadteSeenNotification(){
    const queryClient = useQueryClient();
    return useMutation( async (seenId :number) => {
        const resp = await strapi.update(getNotificationQueryKey(), seenId, {
            seen: true,
        }) as unknown as INotificationResponse;
        queryClient.invalidateQueries([getNotificationQueryKey()]);
        return resp;
    })
}

export default useUpadteSeenNotification;
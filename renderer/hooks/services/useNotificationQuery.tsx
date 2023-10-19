import { INotification, INotificationResponse } from "@/interfaces/INotification";
import strapi from "@/libs/strapi";
import { useQuery } from "@tanstack/react-query";

export const getNotificationQueryKey = () => 'notifications'

function useNotificationQuery(){
    return useQuery<INotification[]>([getNotificationQueryKey()], async () => {
        const resp = await strapi.find(getNotificationQueryKey()) as unknown as INotificationResponse;
        return resp.results;
    })
}

export default useNotificationQuery;
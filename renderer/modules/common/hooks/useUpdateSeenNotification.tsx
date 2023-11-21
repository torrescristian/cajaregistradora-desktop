import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INotificationResponse } from '@/modules/common/interfaces/INotification';
import { NOTIFICATIONS_KEY } from '@/modules/common/consts';

function useUpadteSeenNotification() {
  const queryClient = useQueryClient();
  return useMutation(async (seenId: number) => {
    const resp = (await strapi.update(NOTIFICATIONS_KEY, seenId, {
      seen: true,
    })) as unknown as INotificationResponse;
    queryClient.invalidateQueries([NOTIFICATIONS_KEY]);
    return resp;
  });
}

export default useUpadteSeenNotification;

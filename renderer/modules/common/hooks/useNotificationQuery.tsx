import {
  INotification,
  INotificationResponse,
} from '@/modules/common/interfaces/INotification';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { sub } from 'date-fns';
import { NOTIFICATIONS_KEY } from '../consts';

function useNotificationQuery() {
  return useQuery<INotification[]>([NOTIFICATIONS_KEY], async () => {
    const resp = (await strapi.find(NOTIFICATIONS_KEY, {
      filters: {
        createdAt: {
          $gt: sub(new Date(), { weeks: 1 }),
        },
      },
    })) as unknown as INotificationResponse;
    return resp.results;
  });
}

export default useNotificationQuery;

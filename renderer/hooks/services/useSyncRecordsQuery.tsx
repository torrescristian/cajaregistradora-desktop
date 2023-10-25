import { ISyncRecords } from '@/interfaces/ISyncRecords';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getSyncRecordsQueryKey = () => 'sync-records';

function useSyncRecordsQuery() {
  return useQuery<ISyncRecords>([getSyncRecordsQueryKey()], async () => {
    const resp = await strapi.find(getSyncRecordsQueryKey());
    return resp;
  });
}

export default useSyncRecordsQuery;

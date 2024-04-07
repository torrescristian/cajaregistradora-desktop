import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TABLES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';

import { ITablePayload } from '../interfaces/ITable';

export default function useCreateTableMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: ITablePayload) => strapi.create(TABLES_KEY, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TABLES_KEY]);
      },
    },
  );

  return mutation;
}

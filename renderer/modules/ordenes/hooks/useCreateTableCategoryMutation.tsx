import { TABLES_CATEGORIES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITableCategoryPayload } from '../interfaces/ITable';

export default function useCreateTableCategoryMutation() {
  const queryClient = useQueryClient();

  const createTableCategoryMutation = useMutation(
    async (data: ITableCategoryPayload) => {
      const response = await strapi.create(TABLES_CATEGORIES_KEY, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TABLES_CATEGORIES_KEY]);
      },
    },
  );

  return createTableCategoryMutation;
}

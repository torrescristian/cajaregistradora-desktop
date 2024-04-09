import { useQuery } from '@tanstack/react-query';

import { TABLES_CATEGORIES_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { IResponsePage } from '@/modules/common/interfaces/utils';

import { ITableCategory } from '../interfaces/ITable';

export default function useTableCategoryQuery() {
  const { data, isLoading } = useQuery<ITableCategory[]>(
    [TABLES_CATEGORIES_KEY],
    async () => {
      const res = (await strapi.find(
        TABLES_CATEGORIES_KEY,
        {},
      )) as unknown as IResponsePage<ITableCategory>;

      return res.results;
    },
  );

  return { data, isLoading };
}

import strapi from '@/modules/common/libs/strapi';
import { useMutation } from '@tanstack/react-query';
import { ITable, TABLE_STATUS } from '../interfaces/ITable';
import { TABLES_KEY } from '@/modules/common/consts';

export default function useCompleteTableOrderMutation() {
  return useMutation(async (table: ITable) => {
    return strapi.update(TABLES_KEY, table.id!, {
      order: null,
      status: TABLE_STATUS.FREE,
    });
  });
}

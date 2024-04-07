import { useMutation } from '@tanstack/react-query';

import strapi from '@/modules/common/libs/strapi';
import { TABLES_KEY } from '@/modules/common/consts';

import {
  ITablePayload,
  ITakeTableOrderPayload,
  TABLE_STATUS,
} from '@/modules/ordenes/interfaces/ITable';

export default function useTakeTableOrderMutation() {
  return useMutation(async ({ order, table }: ITakeTableOrderPayload) => {
    return await strapi.update(TABLES_KEY, table, {
      order,
      status: TABLE_STATUS.TAKEN,
    } as Partial<ITablePayload>);
  });
}

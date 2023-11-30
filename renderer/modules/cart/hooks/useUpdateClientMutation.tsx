import { CLIENTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IClient from '../interfaces/IClient';

export default function useUpdateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, name, address, phone_number }: Required<IClient>) => {
      const resp = await strapi.update(CLIENTS_KEY, id, {
        name,
        address,
        phone_number,
      });
      queryClient.invalidateQueries([CLIENTS_KEY]);
      return resp;
    },
  );
}

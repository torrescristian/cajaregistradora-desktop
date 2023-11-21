import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IClient from '@/modules/cart/interfaces/IClient';
import { CLIENTS_KEY } from '@/modules/common/consts';

export default function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (client: IClient) => {
    const resp = await strapi.create(CLIENTS_KEY, client);
    queryClient.invalidateQueries([CLIENTS_KEY]);
    return resp;
  });
}

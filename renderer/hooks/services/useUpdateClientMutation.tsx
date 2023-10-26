import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getClientsQueryKey } from './useClientQuery';

interface IProps {
  id: number;
  name: string;
  address: string;
  number_phone: string;
}
export default function useUpdateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation(async ({ id, name, address, number_phone }: IProps) => {
    const resp = await strapi.update(getClientsQueryKey(), id, {
      name,
      address,
      number_phone,
    });
    queryClient.invalidateQueries([getClientsQueryKey()]);
    return resp;
  });
}

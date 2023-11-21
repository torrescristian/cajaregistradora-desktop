import { CLIENTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface IProps {
  id: number;
  name: string;
  address: string;
  number_phone: string;
}
export default function useUpdateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation(async ({ id, name, address, number_phone }: IProps) => {
    const resp = await strapi.update(CLIENTS_KEY, id, {
      name,
      address,
      number_phone,
    });
    queryClient.invalidateQueries([CLIENTS_KEY]);
    return resp;
  });
}

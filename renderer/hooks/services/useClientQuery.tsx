import IClient, { IClientResponse } from '@/interfaces/IClient';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export const getClientsQueryKey = () => 'clients';

const parseClientFacade = (clientsResponse: IClientResponse): IClient[] => {
  return clientsResponse.data.map((client) => ({
    id: client.id,
    name: client.attributes.name,
    phone_number: client.attributes.phone_number,
    address: client.attributes.address,
  }));
};

export default function useClientsQuery(filter?: string) {
  const filters = filter
    ? {
        $or: [
          {
            address: {
              $containsi: filter,
            },
          },
          {
            name: {
              $containsi: filter,
            },
          },
          {
            phone_number: {
              $containsi: filter,
            },
          },
        ],
      }
    : {};

  return useQuery<IClient[]>([getClientsQueryKey(), filter], async () => {
    const clientsResponse = (await strapi.find(getClientsQueryKey(), {
      filters,
    })) as unknown as IClientResponse;

    return parseClientFacade(clientsResponse);
  });
}

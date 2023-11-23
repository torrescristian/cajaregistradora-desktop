import IClient, { IClientResponse } from '@/modules/cart/interfaces/IClient';
import { CLIENTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const parseClientFacade = (clientsResponse: IClientResponse): IClient[] => {
  return clientsResponse.results.map((client) => ({
    id: client.id,
    name: client.name,
    phone_number: client.phone_number,
    address: client.address,
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

  return useQuery<IClient[]>([CLIENTS_KEY, filter], async () => {
    const clientsResponse = (await strapi.find(CLIENTS_KEY, {
      filters,
    })) as unknown as IClientResponse;

    return parseClientFacade(clientsResponse);
  });
}

import IClient, { IClientResponse } from "@/interfaces/IClient";
import strapi from "@/libs/strapi";
import { useQuery } from "@tanstack/react-query";

export const getClientsQueryKey = () => 'clients';

const parseClientFacade = (clientsResponse: IClientResponse): IClient[] => {
    return clientsResponse.data.map((client) => ({
        id: client.id,
        name: client.attributes.name,
        phone_number: client.attributes.phone_number,
        address: client.attributes.address,
    }))

}

export default function useClientsQuery() {
    return useQuery<IClient[]>([getClientsQueryKey()], async () => {
        const clientsResponse = (await strapi.find(getClientsQueryKey())) as unknown as IClientResponse;
        return parseClientFacade(clientsResponse);

    })
}
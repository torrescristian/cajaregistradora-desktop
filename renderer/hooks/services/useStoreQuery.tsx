import IStore, { IStoreUI } from '@/interfaces/IStore';
import { IResponsePage } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const getStoreQueryKey = () => 'store';

const parseStoreFacade = (store: IStore): IStoreUI => {
  const { id, name } = store;
  return {
    id: id,
    name: name,
  };
};

export default function useStoreQuery() {
  return useQuery<IStoreUI>([getStoreQueryKey()], async () => {
    const stores = (await strapi.find(
      getStoreQueryKey(),
    )) as unknown as IResponsePage<IStore>;
    const [store] = stores.results.map(parseStoreFacade);
    return store;
  });
}

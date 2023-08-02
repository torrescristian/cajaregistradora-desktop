import { ICategoryField, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';
import { useQuery } from 'react-query';

export default function useModelsQuery() {
  return useQuery<ICategoryField[]>('models', async () => {
    const res = (await strapi.find('categories', {
      filters: {
        parent: {
          name: 'Modelos',
        },
      },
      populate: '*',
    })) as unknown as ICategoryResponse;

    if (!res) [];

    return res.data;
  });
}

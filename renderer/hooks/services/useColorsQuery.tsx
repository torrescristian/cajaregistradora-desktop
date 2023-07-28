import { ICategoryField, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export default function useColorsQuery() {
  return useQuery<ICategoryField[]>(['colors'], async () => {
    const res = (await strapi.find('categories', {
      filters: {
        parent: {
          name: 'Colores',
        },
      },
      populate: '*',
    })) as unknown as ICategoryResponse;

    if (!res) [];

    return res.data;
  });
}

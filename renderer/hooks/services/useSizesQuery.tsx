import { ICategory, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const parseCategory = (data: ICategoryResponse): ICategory[] => {
  return data.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      products: item.attributes.products,
      parent: item.attributes.parent,
      childrens: item.attributes.childrens,
      store: item.attributes.store,
      emoji: item.attributes.emoji,
    } as ICategory;
  });
};

export default function useSizesQuery() {
  return useQuery<ICategory[]>(['sizes'], async () => {
    const res = (await strapi.find('categories', {
      filters: {
        parent: {
          name: 'Talles',
        },
      },
      populate: '*',
    })) as unknown as ICategoryResponse;

    if (!res) [];
    return parseCategory(res);
  });
}

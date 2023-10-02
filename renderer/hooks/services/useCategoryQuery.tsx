import { useQuery } from '@tanstack/react-query';
import { ICategory, ICategoryResponse } from '@/interfaces/ICategory';
import strapi from '@/libs/strapi';

export const getCategoryQueryKey = () => 'categories';

const parseCategoryFacade = (
  categoryResponse: ICategoryResponse,
): ICategory[] => {
  return categoryResponse.data.map((category) => ({
    id: category.id,
    name: category.attributes.name,
    variants: category.attributes.variants.data.map((variant) => ({
      id: variant.id,
      name: variant.attributes.name,
      price: variant.attributes.price,
      product: variant.attributes.product,
    })),
    store: category.attributes.store,
  }));
};

export default function useCategoryQuery() {
  return useQuery<ICategory[]>([getCategoryQueryKey()], async () => {
    const resp = (await strapi.find(getCategoryQueryKey(), {
      populate: ['variants'],
    })) as unknown as ICategoryResponse;
    const respCategory = parseCategoryFacade(resp);
    console.log({ respCategory });
    return respCategory;
  });
}

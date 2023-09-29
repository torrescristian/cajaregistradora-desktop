import { IPromo, IPromoResponse } from '@/interfaces/IPromo';
import strapi from '@/libs/strapi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IVariant } from '@/interfaces/IVariants';

export const getPromoQueryKey = () => 'promos';

export const parsePromoFacade = (promoResponse: IPromoResponse): IPromo[] => {
  return promoResponse.data.map((promo) => ({
    id: promo.id,
    name: promo.attributes.name,
    price: promo.attributes.price,
    categories: promo.attributes.categories.data.map((category) => ({
      id: category.id,
      name: category.attributes.name,
      variants: category.attributes.variants.data.map(
        (variant) =>
          ({
            id: variant.id,
            name: variant.attributes.name,
            price: variant.attributes.price,
            product: variant.attributes.product.data.attributes.name,
 
          }) as IVariant<null,string>,
      ),
    })),
    variants: promo.attributes.variants.data.map(
      (variant) =>
        ({
          id: variant.id!,
          name: variant.attributes.name,
          price: variant.attributes.price,
          product: variant.attributes.product.data.attributes.name
        }) as IVariant<null,string>,
    ),
  }));
};

export default function usePromoQuery() {
  return useQuery<IPromo[]>([getPromoQueryKey()], async () => {
    const resp = (await strapi.find(getPromoQueryKey(), {
      populate: [
        'variants',
        'categories',
        'categories.variants.product',
        'variants.product',
      ],
    })) as unknown as IPromoResponse;
    return parsePromoFacade(resp);
  });
}

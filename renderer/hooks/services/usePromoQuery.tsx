import { IPromo, IPromoResponse } from '@/interfaces/IPromo';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { IVariant } from '@/interfaces/IVariants';

export const getPromoQueryKey = () => 'promos';

export const parsePromoFacade = (promoResponse: IPromoResponse): IPromo[] => {
  return promoResponse.data.map((promo) => ({
    id: promo.id,
    name: promo.attributes.name,
    price: promo.attributes.price,
    categories: promo.attributes.categories.map(({ category, quantity }) => ({
      quantity,
      category: {
        id: category.data.id,
        name: category.data.attributes.name,
        variants: category.data.attributes.variants.data.map(
          (variant) =>
            ({
              id: variant.id,
              name: variant.attributes.name,
              price: variant.attributes.price,
              product: variant.attributes.product.data.attributes.name,
            }) as IVariant<null, string>,
        ),
      },
    })),
    variants: promo.attributes.variants.map(({ variant, quantity }) => ({
      quantity,
      variant: {
        id: variant.data.id,
        name: variant.data.attributes.name,
        price: variant.data.attributes.price,
        product: variant.data.attributes.product.data.attributes.name,
      } as IVariant<null, string>,
    })),
  }));
};

export default function usePromoQuery() {
  return useQuery<IPromo[]>([getPromoQueryKey()], async () => {
    const resp = (await strapi.find(getPromoQueryKey(), {
      populate: [
        'categories',
        'categories.variants.product',
        'categories.category.variants.product',
        'variants',
        'variants.variant.product',
      ],
    })) as unknown as IPromoResponse;
    return parsePromoFacade(resp);
  });
}

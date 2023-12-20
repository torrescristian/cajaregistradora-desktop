import { VARIANTS_KEY } from '@/modules/common/consts';
import {
  IVariant,
  IVariantResponse,
  STATUS_VARIANTS,
} from '@/modules/common/interfaces/IVariants';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

export default function useVariantsQuery() {
  return useQuery<IVariant[]>([VARIANTS_KEY], async () => {
    const res = (await strapi.find(VARIANTS_KEY, {
      populate: [
        'product',
        'product.image',
        'product.default_variant',
        'product.default_variant.stock_per_variant',
        'product.type',
        'product.promo',
        'stock_per_variant',
        'categories',
      ],
      filters: {
        status: STATUS_VARIANTS.ENABLED,
      },
    })) as unknown as IVariantResponse;
    return res.results;
  });
}

import { TABLES_KEY } from '@/modules/common/consts';
import { IResponsePage } from '@/modules/common/interfaces/utils';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { ITable } from '../interfaces/ITable';

export default function useTablesQuery() {
  return useQuery<ITable[]>([TABLES_KEY], async () => {
    const res = (await strapi.find(TABLES_KEY, {
      populate: [
        'order',
        'category',
        'order.client',
        'order.items.product',
        'order.items.product.image',
        'order.items.product.type',
        'order.discount',
        'order.payments',
        'order.items.selectedVariant',
        'order.items.selectedVariant.stock_per_variant',
        'order.coupon',
        'order.promoItems',
        'order.promoItems.promo',
        'order.promoItems.selectedVariants',
        'order.promoItems.selectedVariants.stock_per_variant',
        'order.promoItems.selectedVariants.product',
        'order.promoItems.selectedVariants.product.type',
      ],
    })) as unknown as IResponsePage<ITable>;

    return res.results;
  });
}

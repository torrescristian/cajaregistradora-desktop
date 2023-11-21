import { IProductPage } from '@/modules/products/interfaces/IProduct';
import {
  IPromoExpanded,
  IPromoResponse,
  PROMO_STATUS,
} from '@/modules/promos/interfaces/IPromo';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const getPromoQueryKey = () => 'promos';

interface IProductsQueryProps {
  query: string;
  page?: number;
  showPromo?: boolean;
}

export default function usePromoQuery({
  query,
  page,
  showPromo,
}: IProductsQueryProps) {
  const [pagination, setPagination] = useState<IProductPage['pagination']>({
    page: 1,
    pageSize: 20,
    pageCount: 1,
    total: 1,
  });
  return useQuery<IPromoExpanded[]>(
    [getPromoQueryKey(), page, showPromo, query],
    async () => {
      let options: any = {
        populate: [
          'categories',
          'categories.category.variants.product',
          'categories.category.variants.stock_per_variant',
          'variants',
          'variants.variant.product',
          'variants.variant.product.type',
          'variants.variant.stock_per_variant',
        ],
        page: page || 1,
        pageSize: 9,
      };

      options.filters = {
        status: PROMO_STATUS.ENABLED,
      };

      if (showPromo) {
        options.filters.name = {
          $containsi: query,
        };
      }

      const resp = (await strapi.find(
        getPromoQueryKey(),
        options,
      )) as unknown as IPromoResponse;
      return resp.results;
    },
  );
}

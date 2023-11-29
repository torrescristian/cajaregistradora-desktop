import strapi from '@/modules/common/libs/strapi';
import { getErrorMessage, getUrlFromImage } from '@/modules/common/libs/utils';
import {
  IProduct,
  IProductPage,
  PRODUCT_STATUS,
} from '@/modules/products/interfaces/IProduct';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IVariant } from '@/modules/common/interfaces/IVariants';
import { PRODUCTS_KEY } from '@/modules/common/consts';

const parseProductFacade = (product: IProduct): IProduct => {
  const { name, id, isService, variants, image, default_variant, store, type } =
    product;

  const res = {
    id,
    name,
    isService,
    variants: variants.map(
      (variant) =>
        ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          product: id,
          stock_per_variant: variant.stock_per_variant,
        }) as IVariant,
    ),
    image: getUrlFromImage(image),
    default_variant: {
      id: default_variant?.id,
      name: default_variant?.name,
      price: default_variant?.price,
      product: id,
      stock_per_variant: default_variant?.stock_per_variant,
    } as IVariant,
    store: store,
    type: type,
    status: PRODUCT_STATUS.ENABLED,
  };
  return res;
};

interface IProductsQueryProps {
  query: string;
  selectedProductType?: number;
  page?: number;
  showPromo?: boolean;
}

export default function useProductsQuery({
  query,
  selectedProductType,
  page,
  showPromo,
}: IProductsQueryProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState<IProductPage['pagination']>({
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 1,
  });

  const { data, isLoading, isError, isSuccess, error } = useQuery<IProduct[]>(
    [PRODUCTS_KEY, showPromo, query, selectedProductType, page],
    async () => {
      try {
        let options: any = {
          populate: [
            'variants',
            'variants.categories',
            'variants.stock_per_variant',
            'image',
            'default_variant',
            'default_variant.stock_per_variant',
            'type',
            'promo',
          ],
          page: page || 1,
          pageSize: 12,
        };
        options.filters = {
          status: PRODUCT_STATUS.ENABLED,
        };
        if (!showPromo) {
          if (selectedProductType) {
            options.filters = {
              type: selectedProductType,
            };
          }
          if (query) {
            options.filters = {
              ...options.filters,
              $or: [
                {
                  name: {
                    $containsi: query,
                  },
                },
                {
                  variants: {
                    name: {
                      $containsi: query,
                    },
                  },
                },
              ],
            };
          }
        }

        const res = (await strapi.find(
          PRODUCTS_KEY,
          options,
        )) as unknown as IProductPage;

        if (!res) return [];

        const parsedRes = res.results.map(parseProductFacade);

        setPagination(res.pagination);

        return parsedRes;
      } catch (error: any) {
        console.error('🚀 ~ file: useProductsQuery.tsx:71 ~ error:', error);
        if ([401, 403].includes(getErrorMessage(error).status)) {
          router.push('/');

          return [];
        }

        return [];
      }
    },
  );

  const products = data || [];

  return { products, isLoading, isError, isSuccess, pagination, error };
}

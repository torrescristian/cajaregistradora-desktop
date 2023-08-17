import strapi from '@/libs/strapi';
import { getError } from '@/libs/utils';
import IProductUI, { IProduct, IProductPage } from '@/interfaces/IProduct';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IVariantUI } from '@/interfaces/IProduct';

export const getProductsQueryKey = () => 'products';

const parseProductFacade = (product: IProduct): IProductUI => {
  const {
    name,
    id,
    isService,
    variants,
    image,
    categories,
    default_variant,
    store,
    type,
  } = product;

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
          stockPerVariant: variant.stock_per_variant,
        }) as IVariantUI,
    ),
    image: (image as unknown as any)?.formats?.thumbnail?.url || '/default.png',
    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
      product: category.products,
      store: category.store,
      emoji: category.emoji,
      products: category.products,
      childrens: category.childrens,
      parent: category.parent,
    })),
    defaultVariant: {
      id: default_variant.id,
      name: default_variant.name,
      price: default_variant.price,
      product: id,
      stockPerVariant: default_variant.stock_per_variant
    } as IVariantUI,
    store: store,
    type: type,

  };
  return res;
};

interface IProductsQueryProps {
  query: string;
  selectedCategories: number[];
  page?: number;
}

export default function useProductsQuery({
  query,
  selectedCategories,
  page,
}: IProductsQueryProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState<IProductPage['pagination']>({
    page: 1,
    pageSize: 20,
    pageCount: 1,
    total: 1,
  });

  const { data, isLoading, isError, isSuccess } = useQuery<IProductUI[]>(
    [getProductsQueryKey(), query, selectedCategories, page],
    async () => {
      try {
        let options: any = {
          populate: [
            'categories',
            'stock_per_product',
            'variants',
            'variants.categories',
            'variants.categories.parent',
            'variants.stock_per_variant',
            'image',
            'default_variant',
            'default_variant.stock_per_variant',
          ],
          page: page || 1,
          pageSize: 9,
        };

        options.filters =
          selectedCategories?.length === 0
            ? {
                name: {
                  $containsi: query || '',
                },
              }
            : {
                name: {
                  $containsi: query || '',
                },
                $or: [
                  {
                    variants: {
                      categories: selectedCategories,
                    },
                  },
                  {
                    categories: selectedCategories,
                  },
                ],
              };

        const res = (await strapi.find(
          getProductsQueryKey(),
          options,
        )) as unknown as IProductPage;

        if (!res) return [];

        const parsedRes = res.results.map(parseProductFacade);

        setPagination(res.pagination);

        return parsedRes;
      } catch (error: any) {
        console.error('🚀 ~ file: useProductsQuery.tsx:71 ~ error:', error);
        if ([401, 403].includes(getError(error).status)) {
          router.push('/');

          return [];
        }

        return [];
      }
    },
  );

  const products = data || [];

  return { products, isLoading, isError, isSuccess, pagination };
}

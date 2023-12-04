import strapi from '@/modules/common/libs/strapi';
import { getErrorMessage, getUrlFromImage } from '@/modules/common/libs/utils';
import {
  IProduct,
  IProductPage,
  PRODUCT_STATUS,
} from '@/modules/products/interfaces/IProduct';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/modules/common/consts';
import { IVariant } from '@/modules/common/interfaces/IVariants';
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
  pageSize?: number;
}

interface IProps {
  pagination: IProductPage['pagination'];
  products: IProduct[];
}

export default function useProductsQuery({
  query,
  selectedProductType,
  page,
  showPromo,
  pageSize,
}: IProductsQueryProps) {
  const router = useRouter();

  const defaultPagination = {
    page: 1,
    totalPage: 1,
    pageSize:10,
    total: 10,
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery<IProps>(
    [PRODUCTS_KEY, showPromo, query, selectedProductType, page, pageSize],
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
          page,
          pageSize,
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

        if (!res) {
          return {
            pagination: defaultPagination,
            products: [],
          };
        }

        return {
          pagination: res.pagination,
          products: res.results.map(parseProductFacade),
        };
      } catch (e: any) {
        console.error('🚀 ~ file: useProductsQuery.tsx:71 ~ error:', e);
        if ([401, 403].includes(getErrorMessage(e).status)) {
          router.push('/');
          return {
            pagination: defaultPagination,
            products: [],
          };
        }
        return {
          pagination: defaultPagination,
          products: [],
        };
      }
    },
  );
  const products = data?.products || [];
  return {
    products,
    isLoading,
    isError,
    isSuccess,
    pagination: data?.pagination,
    error,
  };
}

import { VARIANTS_KEY } from '@/modules/common/consts';
import {
  IVariantExpanded,
  IVariantExpandedResponse,
  STATUS_VARIANTS,
} from '@/modules/common/interfaces/IVariants';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
  query?: string;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  variants: IVariantExpanded[];
  totalPages: number;
}

export default function useVariantsQuery({
  page,
  query,
  setTotalPages,
}: IProps) {
  return useQuery<IResponse>([VARIANTS_KEY, page, query], async () => {
    let options: any = {
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
      page,
      filters: {
        status: STATUS_VARIANTS.ENABLED,
      },
    };

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
            product: {
              name: {
                $containsi: query,
              },
            },
          },
        ],
      };
    }

    const res = (await strapi.find(
      VARIANTS_KEY,
      options,
    )) as unknown as IVariantExpandedResponse;
    setTotalPages?.(res.pagination.pageCount!);
    return {
      variants: res.results,
      totalPages: res.pagination.pageCount!,
    };
  });
}

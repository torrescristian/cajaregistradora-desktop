import { ICoupon, ICouponResponse } from '@/modules/cupones/interfaces/ICoupon';
import { COUPONS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  coupons: ICoupon[];
  totalPages: number;
}

export default function useCouponsQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([COUPONS_KEY, page], async () => {
    const resp = (await strapi.find(COUPONS_KEY, {
      populate: [
        'discount',
        'variant',
        'variant.product',
        'variant.product.type',
      ],
      filters: {
        availableUses: {
          $gt: 0,
        },
      },
      /*@ts-ignore*/
      page,
    })) as unknown as ICouponResponse;
    setTotalPages?.(resp.pagination.pageCount!);
    return {
      coupons: resp.results,
      totalPages: resp.pagination.pageCount!,
    };
  });
}

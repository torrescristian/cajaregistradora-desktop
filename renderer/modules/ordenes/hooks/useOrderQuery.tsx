import {
  IOrderResponse,
  IOrder,
  ORDER_STATUS,
} from '@/modules/ordenes/interfaces/IOrder';
import { ORDERS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
  setTotalPages: (totalPages: number) => void;
}

interface IResponse {
  orders: IOrder[];
  totalPages: number;
}

export default function useOrderQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([ORDERS_KEY, page], async () => {
    const orderResponse = (await strapi.find(ORDERS_KEY, {
      filters: {
        status: ORDER_STATUS.PENDING,
      },
      populate: [
        'client',
        'items.product',
        'items.product.image',
        'items.product.type',
        'discount',
        'payments',
        'items.selectedVariant',
        'items.selectedVariant.stock_per_variant',
        'coupon',
        'promoItems',
        'promoItems.promo',
        'promoItems.selectedVariants',
        'promoItems.selectedVariants.stock_per_variant',
        'promoItems.selectedVariants.product',
        'promoItems.selectedVariants.product.type',
      ],
      /*@ts-ignore*/
      page,
    })) as unknown as IOrderResponse;
    setTotalPages(orderResponse.pagination.pageCount!);
    return {
      orders: orderResponse.results,
      totalPages: orderResponse.pagination.pageCount!,
    };
  });
}

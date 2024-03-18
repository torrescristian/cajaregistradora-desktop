import { IOrderResponse, IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { DELIVERIES_KEY, ORDERS_KEY } from '@/modules/common/consts';
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

export default function useDeliveriesQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([DELIVERIES_KEY, page], async () => {
    const orderResponse = (await strapi.find(ORDERS_KEY, {
      filters: {
        delivery: {
          id: {
            $notNull: true,
          },
        },
      },
      populate: [
        'client',
        'items.product.image',
        'items.product.type',
        'discount',
        'payments',
        'items.selectedVariant.stock_per_variant',
        'coupon',
        'promoItems.promo',
        'promoItems.selectedVariants',
        'promoItems.selectedVariants.stock_per_variant',
        'promoItems.selectedVariants.product',
        'promoItems.selectedVariants.product.type',
        'delivery',
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

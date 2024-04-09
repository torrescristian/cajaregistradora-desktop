import { IOrder, ORDER_STATUS } from '@/modules/ordenes/interfaces/IOrder';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';

import { parsePromoItemsToCartItems } from '@/modules/common/libs/utils';
import useReturnStock from './useReturnStock';
import { ORDERS_KEY } from '@/modules/common/consts';
import { ICartItem } from '@/modules/cart/interfaces/ICart';

export default function useCancelOrderMutation() {
  const queryClient = useQueryClient();

  const returnStock = useReturnStock();
  return useMutation(async (order: IOrder) => {
    await yup.number().validate(order.id);

    await strapi.update(ORDERS_KEY, order.id!, {
      status: ORDER_STATUS.CANCELLED,
    });
    const cartItemsFromOrder = order.items.map(
      (item) =>
        ({
          product: item.product,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant,
        }) as ICartItem,
    );
    const promises = await returnStock.mutateAsync(cartItemsFromOrder);

    const cartItemsFromPromo = await returnStock.mutateAsync(
      parsePromoItemsToCartItems(order.promoItems),
    );
    const stockRestored = await Promise.allSettled(promises);
    const stockPromoRestored = await Promise.allSettled(cartItemsFromPromo);

    const rejected = [...stockRestored, ...stockPromoRestored].filter(
      ({ status }) => status === 'rejected',
    );

    if (rejected.length > 0) {
      throw new Error('Failed to update stock');
    }

    queryClient.invalidateQueries([ORDERS_KEY]);

    return {
      order,
      stockRestored,
      stockPromoRestored,
    };
  });
}

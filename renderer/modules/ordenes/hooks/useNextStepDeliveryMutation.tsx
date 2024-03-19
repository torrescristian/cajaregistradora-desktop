import strapi from '@/modules/common/libs/strapi';
import { DELIVERY_STATUS } from '@/modules/cart/interfaces/IDelivery';
import { DELIVERIES_KEY } from '@/modules/common/consts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IOrder } from '../interfaces/IOrder';

export default function useNextStepDeliveryMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (order: IOrder) => {
    const res = await strapi.update(DELIVERIES_KEY, order.delivery?.id!, {
      status: DELIVERY_STATUS.READY,
    });

    await queryClient.invalidateQueries([DELIVERIES_KEY]);

    return res;
  });
}

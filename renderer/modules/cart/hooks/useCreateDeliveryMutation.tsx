import { useMutation } from '@tanstack/react-query';

import strapi from '@/modules/common/libs/strapi';
import { DELIVERIES_KEY } from '@/modules/common/consts';

import { IDeliveryPayload } from '../interfaces/IDelivery';

export default function useCreateDeliveryMutation() {
  return useMutation(async (delivery: IDeliveryPayload) => {
    return await strapi.create(DELIVERIES_KEY, delivery);
  });
}

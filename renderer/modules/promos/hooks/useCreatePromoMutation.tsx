import { IPromoPayload } from '@/modules/promos/interfaces/IPromo';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPromoQueryKey } from './usePromoQuery';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';

export default function useCreatePromoMutation() {
  const queryClient = useQueryClient();
  return useMutation(async (promo: IPromoPayload) => {
    const resp = await strapi.create(getPromoQueryKey(), promo);
    queryClient.invalidateQueries([getPromoQueryKey()]);
    return resp as unknown as IStrapiSingleResponse<IPromoPayload>;
  });
}

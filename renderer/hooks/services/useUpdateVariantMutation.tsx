import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getVariantsQueryKey } from './useCreateVariantMutation';
import {
  IVariant,
} from '@/interfaces/IVariants';
import { getProductsQueryKey } from './useProductsQuery';

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (variant: Partial<IVariant>) => {
    const res = await strapi.update(
      getVariantsQueryKey(),
      variant.id!,
      variant,
    );

    queryClient.invalidateQueries([getProductsQueryKey()]);
    queryClient.invalidateQueries([getVariantsQueryKey()]);
    return res;
  });
}

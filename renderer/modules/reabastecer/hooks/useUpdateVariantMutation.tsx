import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IVariant } from '@/modules/common/interfaces/IVariants';
import { PRODUCTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (variant: Partial<IVariant>) => {
    const res = await strapi.update(
      VARIANTS_KEY,
      variant.id!,
      variant,
    );

    queryClient.invalidateQueries([PRODUCTS_KEY]);
    queryClient.invalidateQueries([VARIANTS_KEY]);
    return res;
  });
}

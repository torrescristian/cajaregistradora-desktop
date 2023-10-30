import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import IStockPerVariant from '@/interfaces/IStockPerVariant';
import {
  getStockPerVariantsKey,
  getVariantsQueryKey,
} from './useCreateVariantMutation';

export interface IUseUpdateVariantMutationProps {
  newStock: number;
  stockPerVariantId: number;
  variantId: number;
  price: number;
  name: string;
}

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      newStock,
      name,
      stockPerVariantId,
      variantId,
      price,
    }: IUseUpdateVariantMutationProps) => {
      const newStockPerVariant: Partial<IStockPerVariant> = {
        stock: newStock,
      };

      const priceVariant = await strapi.update(
        getVariantsQueryKey(),
        variantId,
        {
          price,
          name,
        },
      );

      const res = await strapi.update(
        getStockPerVariantsKey(),
        stockPerVariantId,
        newStockPerVariant,
      );
      console.log(res);

      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return [priceVariant, res];
    },
  );
}

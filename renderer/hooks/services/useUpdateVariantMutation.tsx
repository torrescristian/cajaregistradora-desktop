import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import IStockPerVariant from '@/interfaces/IStockPerVariant';

export interface IUseUpdateVariantMutationProps {
  newStock: number;
  stockPerVariantId: number;
  variantId: number;
  price: number;
}

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      newStock,
      stockPerVariantId,
      variantId,
      price,
    }: IUseUpdateVariantMutationProps) => {
      const newStockPerVariant: Partial<IStockPerVariant> = {
        stock: newStock,
      };

      const priceVariant = await strapi.update('variants', variantId, {
        price,
      });

      const res = await strapi.update(
        'stock-per-variants',
        stockPerVariantId,
        newStockPerVariant,
      );
      console.log(res);

      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return [priceVariant, res];
    },
  );
}

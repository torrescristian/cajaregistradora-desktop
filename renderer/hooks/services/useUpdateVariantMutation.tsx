import {IVariantUI } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import IStockPerVariant from '@/interfaces/IStockPerVariant';

export interface IUseUpdateVariantMutationProps {
  newStock: number;
  stockPerVariantId: number;
  variantPrice : number;
}

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ newStock, stockPerVariantId,variantPrice}: IUseUpdateVariantMutationProps) => {

      const newStockPerVariant: Partial<IStockPerVariant> = {
        stock: newStock,
        variant: variantPrice,
      };
      console.log(newStockPerVariant);

      const res = await strapi.update(
        'stock-per-variants',
        stockPerVariantId,
        newStockPerVariant,
      );
      console.log(res);

      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return res;
    },
  );
}

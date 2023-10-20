import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import IStockPerVariant from '@/interfaces/IStockPerVariant';
import { toast } from 'react-toastify';

export interface IUseUpdateVariantMutationProps {
  newStock: number;
  stockPerVariant: IStockPerVariant;
}

export default function useUpdateStockPerVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ newStock, stockPerVariant }: IUseUpdateVariantMutationProps) => {
      const newStockPerVariant: Partial<IStockPerVariant> = {
        stock: newStock,
      };

      if (newStock < 0) {
        toast.error('El stock no puede ser negativo');
        return [null];
      }

      if (stockPerVariant.stock === newStock) {
        return [null];
      }

      if (Number.isNaN(newStock)) {
        toast.error('El stock debe ser un valor numérico');
        return [null];
      }

      const res = await strapi.update(
        'stock-per-variants',
        stockPerVariant.id!,
        newStockPerVariant,
      );

      await queryClient.invalidateQueries([getProductsQueryKey()]);
      toast.success('Stock actualizado correctamente');
      return [res];
    },
  );
}

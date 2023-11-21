import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IStockPerVariant from '@/modules/ordenes/interfaces/IStockPerVariant';
import { toast } from 'react-toastify';
import { PRODUCTS_KEY, STOCK_PER_VARIANTS_KEY } from '@/modules/common/consts';


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
      await queryClient.invalidateQueries([PRODUCTS_KEY]);
      await queryClient.invalidateQueries([STOCK_PER_VARIANTS_KEY]);
      return [res];
    },
  );
}

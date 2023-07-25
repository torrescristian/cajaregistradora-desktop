import { IStockPerVariant } from "@/interfaces/IProduct";
import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductsQueryKey } from "./useProductsQuery";

export interface IUseUpdateVariantMutationProps {
  stock: number;
  stockPerVariant: IStockPerVariant;
}

export default function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ stock, stockPerVariant }: IUseUpdateVariantMutationProps) => {
      const newStock = stock + stockPerVariant.sales_amount_per_variant;

      const newStockPerVariant: Partial<IStockPerVariant> = {
        ...stockPerVariant,
        stock_amount_per_variant: newStock,
      };
      console.log(newStockPerVariant);

      const res = await strapi.update(
        "stock-per-variants",
        stockPerVariant.id,
        newStockPerVariant
      );
      console.log(res);

      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return res;
    }
  );
}

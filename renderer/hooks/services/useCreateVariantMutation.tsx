import { IVariantPayload } from "@/interfaces/IProduct";
import strapi from "@/libs/strapi";
import { useMutation } from "@tanstack/react-query";

export interface IUseCreateVariantMutationProps {
  categories: number[];
  product: number;
  stock: number;
}

export default function useCreateVariantMutation() {
  return useMutation(
    async ({ categories, product, stock }: IUseCreateVariantMutationProps) => {
      const stockPerVariant = await strapi.create<{ id: number }>(
        "stock-per-variants",
        {
          sales_amount_per_variant: 0,
          stock_amount_per_variant: stock,
        }
      );

      const newVariant: IVariantPayload = {
        categories,
        product,
        stock_per_variant: stockPerVariant.data.id,
      };

      const res = await strapi.create("variants", newVariant);

      return res;
    }
  );
}

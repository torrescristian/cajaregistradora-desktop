import { IStockPerVariant } from "@/interfaces/IProduct";
import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductsQueryKey } from "./useProductsQuery";
import IStockPerProduct from "@/interfaces/IStockPerProduct";

export interface IUpdateStockProductMutation {
  stock: number;
  stock_per_product: IStockPerProduct;
}

export default function useUpdateStockProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ stock, stock_per_product }: IUpdateStockProductMutation) => {
      const newStock = stock_per_product.sales_amount_per_product + stock;
      const newStockPerProduct: Partial<IStockPerProduct> = {
        ...stock_per_product,
        stock_amount_per_product: newStock,
      };

      const res = await strapi.update(
        "stock-per-products",
        stock_per_product.id,
        newStockPerProduct
      );

      console.log("Response:", res);
      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return res;
    }
  );
}

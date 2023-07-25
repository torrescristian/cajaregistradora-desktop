import strapi from "@/libs/strapi";
import IProductUI, { IProduct } from "@/interfaces/IProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductsQueryKey } from "./useProductsQuery";

// FUNCTIONS
const parseProductToPayload = (
  product: Partial<IProductUI>
): Partial<IProduct> => {
  const {
    id,
    name,
    catalog_price,
    public_price,
    special_price,
    wholesale_price,

    stock_per_product,
    image,
  } = product;

  return {
    id,
    name,
    catalog_price,
    public_price,
    special_price,
    wholesale_price,
    stock_per_product,

    image,
  };
};

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(async (product: Partial<IProductUI>) => {
    const response = strapi.update(
      "products",
      product.id!,
      parseProductToPayload(product)
    );

    queryClient.invalidateQueries([getProductsQueryKey()]);

    return response;
  });
}

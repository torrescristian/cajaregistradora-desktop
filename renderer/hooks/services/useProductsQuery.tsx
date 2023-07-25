import strapi from "@/libs/strapi";
import { getError } from "@/libs/utils";
import IProductUI, { IProduct, IProductPage } from "@/interfaces/IProduct";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IVariantUI } from "@/interfaces/IProduct";

export const getProductsQueryKey = () => "products";

const parseProductFacade = (product: IProduct): IProductUI => {
  const {
    name,
    id,
    isService,
    variants,
    public_price,
    catalog_price,
    special_price,
    wholesale_price,
    image,
    stock_per_product,
  } = product;

  const res = {
    id,
    name,
    isService,
    variants: variants.map(
      (variant) =>
        ({
          id: variant.id || 0,
          categories: variant.categories,
          stock:
            variant.stock_per_variant.stock_amount_per_variant -
            variant.stock_per_variant.sales_amount_per_variant,
          stock_per_variant: variant.stock_per_variant,
        } as IVariantUI)
    ),
    public_price,
    catalog_price,
    special_price,
    wholesale_price,
    image: (image as unknown as any)?.formats?.thumbnail?.url || "/default.png",
    stock:
      stock_per_product.stock_amount_per_product -
      stock_per_product.sales_amount_per_product,
    price: public_price,
    stock_per_product,
  };
  return res;
};

interface IProductsQueryProps {
  query: string;
  selectedCategories: number[];
  page?: number;
}

export default function useProductsQuery({
  query,
  selectedCategories,
  page,
}: IProductsQueryProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState<IProductPage["pagination"]>({
    page: 1,
    pageSize: 20,
    pageCount: 1,
    total: 1,
  });

  const { data, isLoading, isError, isSuccess } = useQuery<IProductUI[]>(
    [getProductsQueryKey(), query, selectedCategories, page],
    async () => {
      try {
        let options: any = {
          populate: [
            "categories",
            "stock_per_product",
            "variants",
            "variants.categories",
            "variants.categories.parent",
            "variants.stock_per_variant",
            "image",
          ],
          page: page || 1,
          pageSize: 9,
        };

        options.filters =
          selectedCategories?.length === 0
            ? {
                name: {
                  $containsi: query || "",
                },
              }
            : {
                name: {
                  $containsi: query || "",
                },
                $or: [
                  {
                    variants: {
                      categories: selectedCategories,
                    },
                  },
                  {
                    categories: selectedCategories,
                  },
                ],
              };

        const res = (await strapi.find(
          getProductsQueryKey(),
          options
        )) as unknown as IProductPage;

        if (!res) return [];

        const parsedRes = res.results.map(parseProductFacade);

        setPagination(res.pagination);

        return parsedRes;
      } catch (error: any) {
        console.error("🚀 ~ file: useProductsQuery.tsx:71 ~ error:", error);
        if ([401, 403].includes(getError(error).status)) {
          router.push('/');

          return [];
        }

        return [];
      }
    }
  );

  const products = data || [];

  return { products, isLoading, isError, isSuccess, pagination };
}

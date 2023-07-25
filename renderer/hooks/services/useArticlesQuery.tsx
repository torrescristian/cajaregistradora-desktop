import { ICategoryField, ICategoryResponse } from "@/interfaces/ICategory";
import strapi from "@/libs/strapi";
import { useQuery } from "@tanstack/react-query";

export default function useArticlesQuery() {
  return useQuery<ICategoryField[]>(["articles"], async () => {
    const res = (await strapi.find("categories", {
      filters: {
        parent: {
          name: "Articulos",
        },
      },
      populate: "*",
    })) as unknown as ICategoryResponse;

    if (!res) [];

    return res.data;
  });
}

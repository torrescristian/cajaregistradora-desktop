import { ICategoryField, ICategoryResponse } from "@/interfaces/ICategory";
import strapi from "@/libs/strapi";
import { useQuery } from "@tanstack/react-query";

export default function useSizesQuery() {
  return useQuery<ICategoryField[]>(["sizes"], async () => {
    const res = (await strapi.find("categories", {
      filters: {
        parent: {
          name: "Talles",
        },
      },
      populate: "*",
    })) as unknown as ICategoryResponse;

    if (!res) [];

    return res.data;
  });
}

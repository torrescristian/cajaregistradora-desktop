import {
  ICategoryFieldPopulate,
  ICategoryResponsePopulate,
} from "@/interfaces/ICategory";
import strapi from "@/libs/strapi";
import { useQuery } from "@tanstack/react-query";

export default function useFilterMenuQuery(query = "") {
  return useQuery<ICategoryFieldPopulate[]>(["filter-menu"], async () => {
    const res = (await strapi.find("categories", {
      filters: {
        children: {
          name: {
            $containsi: query,
          },
        },
      },
      populate: "*",
    })) as unknown as ICategoryResponsePopulate;

    if (!res) [];

    return res.data;
  });
}

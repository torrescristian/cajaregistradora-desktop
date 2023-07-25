import strapi from "@/libs/strapi";
import { getError } from "@/libs/utils";
import ISaleUI, { ISale, ISalePage } from "@/interfaces/ISale";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";

const getSalesQueryKey = () => "sales";

const parseSaleFacade = (sale: ISale): ISaleUI => {
  const { id, createdAt, sale_items, total_price } = sale;

  return {
    id: id!,
    createdAt: createdAt!,
    total: total_price,
    saleItems: sale_items,
  };
};

const byDate = (a: ISaleUI, b: ISaleUI) => {
  const aDate = new Date(a.createdAt);
  const bDate = new Date(b.createdAt);

  return bDate.getTime() - aDate.getTime();
};

export default function useSalesQuery() {
  const router = useRouter();

  const defaultSale: ISalePage = {
    pagination: {
      page: 1,
      pageSize: 9,
      total: 9,
      pageCount: 1,
    },
    results: [],
  };
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ISalePage>({
      queryKey: [getSalesQueryKey()],
      queryFn: async ( {pageParam = 0}) => {
        try {
          const res = (await strapi.find<ISalePage>("sales", {
            pageSize: 9,
            page: pageParam,
          } as any )) as unknown as ISalePage;

          if (!res) return defaultSale;
          return res;
        } catch (error: any) {
          console.log("🚀 ~ file: useSalesQuery.tsx:57 ~ error:", error);
          if ([401, 403].includes(getError(error).status)) {
            router.push('/');
            return defaultSale;
          }


          return defaultSale;
        }
      },
      getNextPageParam: (lastPage) => lastPage.pagination.pageCount > lastPage.pagination.page ? lastPage.pagination.page + 1 : false 
    });

  const parsedRes = data?.pages.reduce((acc, curr) => acc.concat(curr.results), [] as ISale[]).map(parseSaleFacade) || [];

  const sales = parsedRes.sort(byDate);

  return { sales, isLoading, isError, fetchNextPage, hasNextPage };
}

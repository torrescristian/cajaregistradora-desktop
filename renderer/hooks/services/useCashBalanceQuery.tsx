import strapi from "@/libs/strapi";
import { getError } from "@/libs/utils";
import { ICashBalance, ICashBalancePage } from "@/interfaces/ICashBalance";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export const getCashBalanceKey = () => "cashBalance";

export default function useCashBalanceQuery() {
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useQuery<ICashBalance[]>(
    [getCashBalanceKey()],
    async () => {
      try {
        const res = (await strapi.find("cash-balances", {
          pagination: {
            page: 1,
            limit: 5,
            pageSize: 5,
            start: 0,
          },
        })) as unknown as ICashBalancePage;

        if (!res) return [];

        const parsedRes = res.results;

        return parsedRes;
      } catch (error: any) {
        console.log("🚀 ~ file: useCashBalance.tsx:47 ~ error:", error);
        if ([401, 403].includes(getError(error).status)) {
          
          router.push("/");

          return [];
        }

        return [];
      }
    }
  );

  const cashBalances = data || [];

  return { cashBalances, isLoading, isError, isSuccess };
}

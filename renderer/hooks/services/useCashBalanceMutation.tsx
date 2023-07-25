import strapi from "@/libs/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCashBalanceKey } from "./useCashBalanceQuery";

export default function useCashBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation(async () => {
    const res = await strapi.create("cash-balances", {
      data: {
        total_amount: 0,
        products_sold: [],
      },
    });

    queryClient.invalidateQueries([getCashBalanceKey()]);

    return res;
  });
}

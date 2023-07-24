import strapi from '@/libs/strapi';
import { getError } from '@/libs/utils';
import ISaleUI, { ISale, ISalePage } from '@/interfaces/ISale';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const getSalesQueryKey = () => 'sales';

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

  const { data, isLoading, isError } = useQuery<ISaleUI[]>(
    getSalesQueryKey(),
    async () => {
      try {
        const res = (await strapi.find<ISalePage>(
          'sales'
        )) as unknown as ISalePage;

        if (!res) return [];

        const parsedRes = res.results.map(parseSaleFacade);

        return parsedRes.sort(byDate);
      } catch (error: any) {
        console.log('🚀 ~ file: useSalesQuery.tsx:57 ~ error:', error);
        if ([401, 403].includes(getError(error).status)) {
          router.push('/login');

          return [];
        }

        return [];
      }
    }
  );

  const sales = data || [];

  return { sales, isLoading, isError };
}

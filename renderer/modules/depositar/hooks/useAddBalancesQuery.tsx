import {
  INewAddBalance,
  IAddNewBalanceResponse,
} from '@/modules/caja/interfaces/INewAddBalance';
import { DEPOSITS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
  setTotalPages?: (totalPages: number) => void;
}

interface IResponse {
  addNewBalances: INewAddBalance[];
  totalPages: number;
}

export default function useAddBalancesQuery({ page, setTotalPages }: IProps) {
  return useQuery<IResponse>([DEPOSITS_KEY, page], async () => {
    const resp = (await strapi.find(DEPOSITS_KEY, {
      populate: ['type'],
      /* @ts-ignore*/
      page,
    })) as unknown as IAddNewBalanceResponse;
    setTotalPages?.(resp.pagination.pageCount!);
    return {
      addNewBalances: resp.results,
      totalPages: resp.pagination.pageCount!,
    };
  });
}

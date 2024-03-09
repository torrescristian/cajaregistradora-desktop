import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import Loader from '@/modules/common/components/Loader';
import useAddBalancesQuery from '../hooks/useAddBalancesQuery';
import {
  Pagination,
  usePagination,
} from '@/modules/common/components/molecules/Pagination';

import CreateAddBalanceForm from '../organisms/CreateAddBalanceForm';
import AddToBalanceTable from '../template/addToBalanceTable';

export default function AddToBalance() {
  const paginationControls = usePagination();

  const addBalanceQuery = useAddBalancesQuery({
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
  });

  const addBalances = addBalanceQuery.data?.addNewBalances || [];

  if (addBalanceQuery.isLoading) return <Loader />;
  const data = addBalances.map(
    (addBalance) =>
      ({
        id: addBalance.id,
        createdAt: addBalance.createdAt,
        amount: addBalance.amount,
        reason: addBalance.reason,
      }) as INewAddBalance,
  );
  return (
    <section className="w-full flex flex-col justify-center gap-10">
      <CreateAddBalanceForm data={data} />
      <AddToBalanceTable data={data!} />
      <Pagination {...paginationControls} />
    </section>
  );
}

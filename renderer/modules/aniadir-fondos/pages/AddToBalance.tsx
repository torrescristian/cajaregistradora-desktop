import { INewAddBalance } from '@/modules/caja/interfaces/INewAddBalance';
import Loader from '@/modules/common/components/Loader';
import useAddBalancesQuery from '../hooks/useAddBalancesQuery';
import {
  ButtonPagination,
  useButtonPagination,
} from '@/modules/reabastecer/components/ButtonPagination';

import CreateAddBalanceForm from '../organisms/CreateAddBalanceForm';

export default function AddToBalance() {
  const paginationControls = useButtonPagination();

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
        amount: addBalance.amount,
        reason: addBalance.reason,
        createdAt: addBalance.createdAt,
        status: addBalance.status,
        type: addBalance.type,
      }) as INewAddBalance,
  );
  return (
    <section className="w-full flex flex-col justify-center gap-10">
      <CreateAddBalanceForm data={data} />
    </section>
  );
}

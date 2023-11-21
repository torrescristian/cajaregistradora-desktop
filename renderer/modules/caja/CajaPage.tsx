import PageLayout from '@/modules/common/components/PageLayout';
import { RenderIf } from '@/modules/common/components/RenderIf';
import Loader from '@/modules/common/components/Loader';
import { formatPrice } from '@/modules/common/libs/utils';
import { format } from 'date-fns';
import useActiveCashBalanceQuery from './hooks/useActiveCashBalanceQuery';
import useFormControl from '@/modules/common/hooks/useFormControl';
import useInitCashMutation from './hooks/useInitCashMutation';
import { CashBalanceActivate } from './components/CashBalanceActive';
import { CashBalance, CreateCashBalance } from './components/CashBalance';
import { CloseCashBalance } from './components/CloseCashBalance';

export default function CajaPage() {
  const {
    cashBalance,
    todayCashBalances,
    isLoading: activeCashLoading,
    isError,
    isSuccess,
    cashIsActive,
  } = useActiveCashBalanceQuery();

  const { handleChange, value } = useFormControl(0);

  const isLoading = activeCashLoading;

  const initCashMutation = useInitCashMutation();
  const handleClick = () => {
    initCashMutation.mutate({
      initialCashAmount: Number(value),
    });
  };

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
      <section>
        <ul className="flex flex-col items-center gap-5">
          <section className="flex">
            {isError && <p>Error</p>}
            <RenderIf condition={isLoading}>
              <Loader className="mt-5" />
            </RenderIf>
            <RenderIf condition={!isLoading && isSuccess}>
              <RenderIf condition={cashIsActive}>
                <CashBalanceActivate cashBalance={cashBalance} />
              </RenderIf>
              <RenderIf condition={!cashIsActive}>
                <CashBalance value={value} onChange={handleChange} />
              </RenderIf>
            </RenderIf>
          </section>
          <section className="flex">
            <RenderIf condition={isLoading}>
              <Loader className="mt-5" />
            </RenderIf>
            <RenderIf condition={!isLoading && isSuccess}>
              <RenderIf condition={!cashIsActive}>
                <CreateCashBalance onClick={handleClick} />
              </RenderIf>
              <RenderIf condition={cashIsActive}>
                <CloseCashBalance cashBalanceId={cashBalance?.id!} />
              </RenderIf>
            </RenderIf>
          </section>
        </ul>
      </section>

      <RenderIf condition={todayCashBalances.length}>
        <section className="w-full flex flex-col gap-5">
          <p className="text-2xl text-center">Cajas del dia</p>
          <div className="flex flex-row w-full gap-5 overflow-x-scroll">
            {todayCashBalances.map((todayCashBalance) => (
              <div
                key={todayCashBalance.id!}
                className="flex flex-col w-max p-5 border-2"
              >
                <p>👤Vendedor: {todayCashBalance.seller.username}</p>
                <p className="whitespace-nowrap">
                  💰Monto de caja inicial:{' '}
                  {formatPrice(todayCashBalance.initialCashAmount)}
                </p>
                <p className="whitespace-nowrap">
                  💸Total de la caja:{' '}
                  {formatPrice(todayCashBalance.totalAmount)}
                </p>
                <p className="whitespace-nowrap">
                  ⏰La Caja cerro a las -{' '}
                  {format(new Date(todayCashBalance.completedAt), 'HH:mm')}Hs
                </p>
              </div>
            ))}
          </div>
        </section>
      </RenderIf>
    </PageLayout>
  );
}

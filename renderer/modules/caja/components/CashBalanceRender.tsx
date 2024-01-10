import { RenderIf } from '@/modules/common/components/RenderIf';
import Loader from '@/modules/common/components/Loader';
import { CashBalanceActivateMobile } from '@/modules/common/components/Mobile/CashBalanceActiveMobile';
import {
  CashBalanceMobile,
  CreateCashBalance,
} from '@/modules/common/components/Mobile/CashBalanceMobile';
import { CloseCashBalance } from './CloseCashBalance';
import { CashBalanceActivate } from './CashBalanceActive';
import { CashBalance } from './CashBalance';
import useActiveCashBalanceQuery from '../hooks/useActiveCashBalanceQuery';
import useFormControl from '@/modules/common/hooks/useFormControl';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import useInitCashMutation from '../hooks/useInitCashMutation';
import PageLayout from '@/modules/common/components/PageLayout';

export default function CashBalanceRender() {
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
  const isMobile = useIsMobile();

  const initCashMutation = useInitCashMutation();
  const handleClick = () => {
    initCashMutation.mutate({
      initialCashAmount: Number(value),
    });
  };

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
      {isMobile ? (
        <div className="w-full">
          <section className="flex">
            {isError && <p>Error</p>}
            <RenderIf condition={isLoading}>
              <Loader className="mt-5" />
            </RenderIf>
            <RenderIf condition={!isLoading && isSuccess}>
              <RenderIf condition={cashIsActive}>
                <CashBalanceActivateMobile cashBalance={cashBalance} />
              </RenderIf>
              <RenderIf condition={!cashIsActive}>
                <CashBalanceMobile value={value} onChange={handleChange} />
              </RenderIf>
            </RenderIf>
          </section>
          <section className="flex w-full items-center pt-5">
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
        </div>
      ) : (
        <div className="w-full flex flex-row gap-10 p-5">
          <div className="text-primary-content">
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
          </div>
        </div>
      )}
    </PageLayout>
  );
}

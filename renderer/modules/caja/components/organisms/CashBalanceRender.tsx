import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import Loader from '@/modules/common/components/atoms/Loader';
import { CloseCashBalance } from '../molecules/CloseCashBalance';
import { CashBalanceActivate } from '../molecules/CashBalanceActive';
import { InitialCashBalanceInput } from '../molecules/InitialCashBalanceInput';
import useActiveCashBalanceQuery from '../../hooks/useActiveCashBalanceQuery';
import useFormControl from '@/modules/common/hooks/useFormControl';
import useInitCashMutation from '../../hooks/useInitCashMutation';
import PageLayout from '@/modules/common/components/templates/PageLayout';

export default function CashBalanceRender() {
  const {
    cashBalance,
    isLoading: activeCashLoading,
    isError,
    isSuccess,
    cashIsActive,
  } = useActiveCashBalanceQuery();

  const { handleChange, value } = useFormControl(0);

  const isLoading = activeCashLoading;

  const initCashMutation = useInitCashMutation();

  const handleClickInitCash = () => {
    initCashMutation.mutate({
      initialCashAmount: Number(value),
    });
  };

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
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
                  <InitialCashBalanceInput
                    value={value}
                    onChange={handleChange}
                  />
                </RenderIf>
              </RenderIf>
            </section>
            <section className="flex">
              <RenderIf condition={!isLoading && isSuccess}>
                <RenderIf condition={!cashIsActive}>
                  <button
                    className="btn flex w-fit btn-primary text-primary-content"
                    onClick={handleClickInitCash}
                  >
                    Iniciar Caja
                  </button>
                </RenderIf>
                <RenderIf condition={cashIsActive}>
                  <CloseCashBalance cashBalanceId={cashBalance?.id!} />
                </RenderIf>
              </RenderIf>
            </section>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

import PageLayout from '@/components/PageLayout';
import useInitCashMutation from '@/hooks/services/useInitCashMutation';
import Loader from '@/components/Loader';
import { CashBalance, CreateCashBalance } from '@/components/CashBalance';
import useActiveCashBalanceQuery from '@/hooks/services/useActiveCashBalanceQuery';
import { CashBalanceActivate } from '@/components/CashBalanceActive';
import { RenderIf } from '@/components/RenderIf';
import useFormControl from '@/hooks/useFormControl';
import { CloseCashBalance } from '@/components/CloseCashBalance';


const Caja = () => {

  const {
    cashBalance,
    isLoading: activeCashLoading,
    isError,
    isSuccess,
    cashIsActive
  } = useActiveCashBalanceQuery();

  const { handleChange, value } = useFormControl(0)

  const isLoading = activeCashLoading;

  const initCashMutation = useInitCashMutation();

  const handleClick = () => {
    initCashMutation.mutate({
      initialCashAmount: Number(value),
    });
  }

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
      <section>
        <h2 className="text-lg">
          Registra las ventas desde la última vez que hiciste caja y mira el
          registro de las últimas cajas realizadas
        </h2>
        <ul className="flex flex-col">
          <section className="flex w-full justify-center m-5">
            <RenderIf condition={isLoading}>
              <Loader className='mt-5' />
            </RenderIf>
            <RenderIf condition={!isLoading && isSuccess}>
              <RenderIf condition={cashIsActive}>
                <CloseCashBalance cashBalanceId={cashBalance?.id!} />
              </RenderIf>
              <RenderIf condition={!cashIsActive}>
                <CreateCashBalance onClick={handleClick} />
              </RenderIf>
            </RenderIf>
          </section>
          <section className="grid gap-5 grid-cols-3 justify-center justify-items-center content-center items-center w-full">
             {isError && <p>Error</p>} 
            <RenderIf condition={isLoading} >
              <Loader className='mt-5' />
            </RenderIf>
            <RenderIf condition={!isLoading && isSuccess}>
              <RenderIf condition={cashIsActive}>
                <CashBalanceActivate cashBalance={cashBalance} />
              </RenderIf>
              <RenderIf condition={!cashIsActive}>
                <CashBalance
                  cashBalance={cashBalance}
                  value={value}
                  onChange={handleChange} />
              </RenderIf>
            </RenderIf>
          </section>
        </ul>
      </section>
    </PageLayout>
  );
};

export default Caja;

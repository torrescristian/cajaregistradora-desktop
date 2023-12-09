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
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import { CashBalanceActivateMobile } from '../common/components/Mobile/CashBalanceActiveMobile';
import { CashBalanceMobile } from '../common/components/Mobile/CashBalanceMobile';
import useTicketPendingQuery from '../recibos/hooks/useTicketPendingQuery';
import { CancelTicketPending } from './components/CancelTicketPending';
import { useAuthState } from '../common/contexts/AuthContext';
import { ICashBalance } from './interfaces/ICashBalance';
import React from 'react';
import usePrintService from '../common/hooks/usePrintService';

export default function CajaPage() {
  const {
    cashBalance,
    todayCashBalances,
    isLoading: activeCashLoading,
    isError,
    isSuccess,
    cashIsActive,
  } = useActiveCashBalanceQuery();

  const ticketPendingQuery = useTicketPendingQuery();
  const ticketPending = ticketPendingQuery.data || [];

  const { isOwner } = useAuthState();

  const { handleChange, value } = useFormControl(0);

  const isLoading = activeCashLoading;
  const isMobile = useIsMobile();

  const initCashMutation = useInitCashMutation();
  const handleClick = () => {
    initCashMutation.mutate({
      initialCashAmount: Number(value),
    });
  };

  const { printCash } = usePrintService();

  const handleClickReprint =
    (cashBalance: ICashBalance) => (e: React.MouseEvent) => {
      e.preventDefault();

      printCash(cashBalance.id!);
    };

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
      <RenderIf condition={isOwner}>
        <RenderIf condition={ticketPending.length > 0}>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-warning m-1">
              <p>
                Hay{' '}
                <span className="badge-error badge p-3">
                  {ticketPending.length}
                </span>{' '}
                pendientes en espera
              </p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[10] p-5 shadow bg-neutral rounded-box md:w-[45vw] h-[45vh] md:h-[65vh] overflow-x-scroll "
            >
              {ticketPending.map((ticket) => (
                <CancelTicketPending key={ticket.id} ticket={ticket} />
              ))}
            </ul>
          </div>
        </RenderIf>
      </RenderIf>
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
        <div>
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
              <div className="flex flex-row w-full gap-5 flex-wrap w-1/4">
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
                      {format(new Date(todayCashBalance.completedAt), 'HH:mm')}
                      Hs
                    </p>
                    <button
                      onClick={handleClickReprint(todayCashBalance)}
                      className="btn btn-secondary"
                    >
                      Reimprimir Ticket
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </RenderIf>
        </div>
      )}
    </PageLayout>
  );
}

import PageLayout from '@/components/PageLayout';
import { parseDateToArgentinianFormat } from '@/libs/utils';
import useCashBalanceMutation from '@/hooks/services/useCashBalanceMutation';
import useCashBalanceQuery from '@/hooks/services/useCashBalanceQuery';
import { ICashBalance } from '@/interfaces/ICashBalance';
import { IProduct } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';

interface ICashBalanceProps {
  cashBalance: ICashBalance;
}

const Small = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-normal">{children}</span>
);

const Bold = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lg font-bold">{children}</span>
);

const CashBalance = ({ cashBalance }: ICashBalanceProps) => {
  return (
    <li
      key={cashBalance.id}
      className="w-max rounded-lg bg-stone-50 p-5 text-center shadow-xl"
    >
      <Small>{parseDateToArgentinianFormat(cashBalance.createdAt)}</Small>
      <p>
        <Small>Total: $</Small> <span className='badge badge-secondary text-white'>{cashBalance.total_amount}</span>
      </p>
      <ul className="mt-5">
        {cashBalance.products_sold.map((productSold) => {
          const { id, name } = productSold.product as IProduct;
          const quantity = productSold.quantity;
          return (
            <li key={id} className="">
              <p className="text-left">
                 <span className='badge text-white badge-secondary '>{quantity}</span> - {name}.
              </p>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

interface ICreateCashBalanceProps {
  onClick: () => void;
  disabled: boolean;
}
const CreateCashBalance = ({ onClick, disabled }: ICreateCashBalanceProps) => (
  <button
    className="btn flex w-fit bg-green-500 text-stone-50 hover:bg-green-600"
    onClick={onClick}
    disabled={disabled}
  >
    Hacer Caja
  </button>
);

const Caja = () => {
  const {
    cashBalances,
    isLoading: queryLoading,
    isError,
  } = useCashBalanceQuery();
  const cashBalanceMutation = useCashBalanceMutation();

  const isLoading = queryLoading || cashBalanceMutation.isLoading;

  const handleClick = () => {
    cashBalanceMutation.mutate();
  };

  return (
    <PageLayout>
      <h1 className="text-2xl">Balance de caja</h1>
      <section>
        <h2 className="text-lg">
          Registra las ventas desde la última vez que hiciste caja y mira el
          registro de las últimas cajas realizadas
        </h2>
        <ul className="flex flex-col">
          <section className='flex w-full justify-center m-5'>
            {isLoading ? (
              <Loader className="mt-5" />
            ) : (
              <CreateCashBalance onClick={handleClick} disabled={isLoading} />
            )}
          </section>
          <section className="grid gap-5 grid-cols-3 justify-center justify-items-center content-center items-center w-max">
            {isError && <p>Error</p>}
            {cashBalances.map((cashBalance) => (
              <CashBalance key={cashBalance.id} cashBalance={cashBalance} />
            ))}
          </section>
        </ul>
      </section>
    </PageLayout>
  );
};

export default Caja;

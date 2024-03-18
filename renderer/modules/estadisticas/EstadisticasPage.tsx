import { useState } from 'react';
import { CalendarMonth } from './components/CalendarMonth';
import useCashBalancesByDateQuery from '../caja/hooks/useCashBalancesByDateQuery';
import FieldLabel from '../common/components/atoms/FieldLabel';

function EstadisticasPage() {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [bringConfirmed, setBringConfirmed] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filtering, setFiltering] = useState('');

  const cashBalancesQuery = useCashBalancesByDateQuery({
    startDate,
    endDate,
    page,
    pageSize,
  });
  const cashBalances = cashBalancesQuery.data?.cashBalances || [];
  const totalPages = cashBalancesQuery.data?.totalPages || 0;

  const handleChangeRegister = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  const handleSelectRange = (
    [startDate, endDate]: any,
    e: React.MouseEvent,
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const onNextPage = () => {
    setPage((p: number) => {
      if (p >= totalPages) {
        return p;
      }
      return p + 1;
    });
  };

  const onPreviousPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <section className="flex flex-col w-full p-5 gap-5 ">
      <p className="text-3xl font-bold">Sistema de Turnos</p>
      <p className="text-xl text-secondary-focus">
        Muestra de actividades de todos los usuarios
      </p>
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-5">
            <FieldLabel title="Cantidad visible" columnMode>
              <select
                className="select select-bordered"
                value={pageSize}
                onChange={handleChangeRegister}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </FieldLabel>
            {/* <label className="input-group">
              <span>🔎</span>
              <input
                className="input input-bordered"
                placeholder="Buscar"
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </label>
            <label className="input-group gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={bringConfirmed}
                onChange={(e) => setBringConfirmed(e.target.checked)}
              />
              Incluir confirmados
            </label> */}
          </div>
        </div>
        <div className="w-full">
          <CalendarMonth
            filtering={filtering}
            endDate={endDate!}
            startDate={startDate!}
            handleSelectRange={handleSelectRange}
            setFiltering={setFiltering}
            bringConfirmed={bringConfirmed}
            pageSize={pageSize}
            totalPages={totalPages}
            cashBalances={cashBalances}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            page={page}
          />
        </div>
      </div>
    </section>
  );
}
export default EstadisticasPage;

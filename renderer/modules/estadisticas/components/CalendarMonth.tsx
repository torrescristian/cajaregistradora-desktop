import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';
import { RenderIf } from '@/modules/common/components/atoms/RenderIf';
import es from 'date-fns/locale/es';
import { CalendarWeek } from './CalendarWeek';
import { ICashBalanceExpanded } from '@/modules/caja/interfaces/ICashBalance';

interface IProps {
  filtering?: string;
  setFiltering?: (value: string) => void;
  handleSelectRange: (
    value: any,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined;
  bringConfirmed: boolean;
  pageSize: number;
  cashBalances: ICashBalanceExpanded[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  totalPages: number;
  startDate: Date;
  endDate: Date;
}

export const CalendarMonth = ({
  filtering,
  setFiltering,
  handleSelectRange,
  onNextPage,
  onPreviousPage,
  page,
  cashBalances,
  totalPages,
  endDate,
  startDate,
}: IProps) => {
  return (
    <div className="w-full flex flex-row ">
      <div className="flex flex-col">
        <RenderIf condition={!startDate}>
          <p>Selecciona un dia</p>
        </RenderIf>
        <RenderIf condition={startDate}>
          <p className="text-center">
            Turnos del{' '}
            <span className="font-bold">
              {format(new Date(startDate!), 'cccc dd LLLL  ', { locale: es })}
            </span>
            <RenderIf condition={endDate && !isSameDay(startDate!, endDate!)}>
              hasta el{' '}
              <span className="font-bold">
                {format(new Date(endDate!), 'cccc dd LLLL  ', { locale: es })}
              </span>
            </RenderIf>
          </p>
        </RenderIf>
        <CalendarWeek
          handleSelectRange={handleSelectRange}
          totalPages={totalPages}
          filtering={filtering}
          setFiltering={setFiltering}
          cashBalances={cashBalances}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          page={page}
        />
      </div>
    </div>
  );
};

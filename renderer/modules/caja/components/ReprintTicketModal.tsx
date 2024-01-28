import usePrintService from '@/modules/common/hooks/usePrintService';
import { ICashBalance, ICashBalanceExpanded } from '../interfaces/ICashBalance';
import { PrinterIcon } from '@heroicons/react/24/solid';

interface IProps {
  cashBalance: ICashBalance | ICashBalanceExpanded;
}

export default function ReprintTicketModal({ cashBalance }: IProps) {
  const { printCash } = usePrintService();

  const handleClickReprint =
    (cashBalance: ICashBalance | ICashBalanceExpanded) =>
    (e: React.MouseEvent) => {
      e.preventDefault();

      printCash(cashBalance.id!);
    };

  return (
    <button
      onClick={handleClickReprint(cashBalance)}
      className="btn btn-neutral gap-3"
    >
      <PrinterIcon className="w-5 h-5" /> Reimprimir
    </button>
  );
}

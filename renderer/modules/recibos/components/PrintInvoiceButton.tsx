import usePrintService from '@/modules/common/hooks/usePrintService';
import { PrinterIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface IProps {
  ticketId: number;
  orderId: number;
}

export default function PrintInvoiceButton({ ticketId, orderId }: IProps) {
  const { printInvoice, printCommand } = usePrintService();

  const handlePrint = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await printInvoice(ticketId);
    await printCommand(orderId);
  };

  return (
    <button onClick={handlePrint} className="btn btn-neutral">
      <PrinterIcon className="w-5 h-5" />
    </button>
  );
}

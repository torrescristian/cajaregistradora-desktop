import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { findOrderById } from '../../ordenes/hooks/findOrderById';
import findTicketById from '../../recibos/services/findTicketById';
import findCashOptionsById from '@/modules/recibos/services/findTicketsByCashId';

const SOCKET_LOCALHOST = 'http://localhost:4000';

enum EVENT_TYPE {
  PRINT_INVOICE = 'print:invoice',
  PRINT_COMMAND = 'print:command',
  PRINT_CASH = 'print:cash',
}

export default function usePrintService() {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setSocket(io(SOCKET_LOCALHOST));

    return () => {
      socket?.disconnect();
    };
  }, []);

  const _emit = (event: EVENT_TYPE, props: any) =>
    socket.emit(event, JSON.stringify(props));

  const printInvoice = async (ticketId: number) => {
    const ticket = await findTicketById(ticketId);

    _emit(EVENT_TYPE.PRINT_INVOICE, ticket);
  };

  const printCash = async (cashId: number) => {
    const options = await findCashOptionsById(cashId);

    console.table(options)

    _emit(EVENT_TYPE.PRINT_CASH, options);
  };

  const printCommand = async (orderId: number) => {
    const order = await findOrderById(orderId);

    _emit(EVENT_TYPE.PRINT_COMMAND, order);
  };

  return {
    printCommand,
    printInvoice,
    printCash,
  };
}

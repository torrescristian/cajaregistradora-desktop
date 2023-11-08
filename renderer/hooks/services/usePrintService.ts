import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { findOrderById } from './findOrderById';
import findTicketById from './findTicketById';

const SOCKET_LOCALHOST = 'http://localhost:4000';

enum EVENT_TYPE {
  PRINT_ORDER = 'print:order',
  PRINT_INVOICE = 'print:invoice',
  PRINT_COMMAND = 'print:command',
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

  const printOrder = async (orderId: number) => {
    const order = await findOrderById(orderId);

    _emit(EVENT_TYPE.PRINT_ORDER, order);
  };

  const printInvoice = async (ticketId: number) => {
    const ticket = await findTicketById(ticketId);

    console.log(ticket);

    _emit(EVENT_TYPE.PRINT_INVOICE, ticket);
  };

  const printCommand = async (orderId: number) => {
    const order = await findOrderById(orderId);

    _emit(EVENT_TYPE.PRINT_COMMAND, order);
  };

  return {
    printCommand,
    printInvoice,
    printOrder,
  };
}

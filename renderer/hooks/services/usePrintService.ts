import { IOrder } from '@/interfaces/IOrder';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getOrderQueryKey } from './useOrderQuery';
import { findOrderById } from './findOrderById';

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

    console.log(order);

    _emit(EVENT_TYPE.PRINT_ORDER, order);
  };

  const printInvoice = () => _emit(EVENT_TYPE.PRINT_INVOICE, null);

  const printCommand = () => _emit(EVENT_TYPE.PRINT_COMMAND, null);

  return {
    printCommand,
    printInvoice,
    printOrder,
  };
}

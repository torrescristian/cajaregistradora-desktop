import escpos from 'escpos';
import escposUSB from 'escpos-usb';

import {
  discountToString,
  formatPrice,
  parseDateToArgentinianFormat,
  parseDateToTime,
} from '../helpers/utils';
import {
  ALIGN,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
  FONT_SIZE_BIG,
} from '../helpers/const';
import { IPayment, ITicket, PAYMENT_TYPE } from '../interfaces/ITicket';
import { ICashBalance } from '../interfaces/ICashBalance';
import { IExpense } from '../interfaces/IExpense';

interface IProps {
  tickets: ITicket[];
  cashBalance: ICashBalance;
  refundedTickets: ITicket[];
  expenses: IExpense[];
}

function getPaymentText(payments: IPayment[]) {
  if (payments.length > 1) {
    return 'Mix.';
  }
  const payment = payments[0];

  switch (payment.type) {
    case PAYMENT_TYPE.CASH:
      return 'Efec.';
    case PAYMENT_TYPE.CREDIT:
      return 'Cred.';
    case PAYMENT_TYPE.DEBIT:
      return 'Deb.';
    default:
      return '';
  }
}

export default function printCashBalance({
  cashBalance,
  tickets,
  refundedTickets,
  expenses,
}: IProps) {
  try {
    if (!tickets[0].order?.id) {
      console.log('There is not Order ID');
      return;
    }
    if (!escposUSB) throw new Error('No escpos USB found');

    escpos.USB = escposUSB;

    const connectedDevices = escpos.USB.findPrinter() as any[];
    if (!connectedDevices.length) throw new Error('No connected devices');

    let device: escpos.USB;
    const options = { width: 32 };
    let printer;
    const firstTicket = tickets[0];

    try {
      device = new escpos.USB();
      printer = new escpos.Printer(device, options as any);
    } catch (error) {
      console.error(error);
    }

    device.open((error) => {
      console.log({ error });
      if (error) throw new Error(error);

      // open & set printer4
      printer
        .text(FONT_SIZE_BIG)
        .text(firstTicket.store.name)
        .text(FONT_SIZE_NORMAL);

      printer
        .text(`Fecha: ${parseDateToArgentinianFormat(firstTicket.createdAt)}`)
        .drawLine();
      // store, client and order data

      printer.text(FONT_SIZE_NORMAL);
      // order items
      for (const ticket of tickets) {
        printer
          .align(ALIGN.LT)
          .text(`${parseDateToTime(ticket.createdAt)} - ID ${ticket.order.id}`)
          .align(ALIGN.RT)
          .text(
            `Pago ${getPaymentText(ticket.payments)} ${formatPrice(
              ticket.totalPrice,
            )}`,
          );
      }

      if (refundedTickets.length) {
        printer.drawLine().align(ALIGN.LT).text('Reembolsos');

        for (const ticket of refundedTickets) {
          printer
            .align(ALIGN.LT)
            .text(
              `${parseDateToTime(ticket.createdAt)} - ID ${ticket.order.id}`,
            )
            .align(ALIGN.RT)
            .text(`${formatPrice(ticket.totalPrice)}`);
        }
      }

      if (expenses.length) {
        printer.drawLine().align(ALIGN.LT).text('Gastos');

        for (const expense of expenses) {
          printer
            .align(ALIGN.LT)
            .text(`${parseDateToTime(expense.createdAt)} - ${expense.reason}`)
            .align(ALIGN.RT)
            .text(`${formatPrice(expense.amount)}`);
        }
      }

      printer
        .drawLine()
        .align(ALIGN.LT)
        .text(`Total Bruto: ${formatPrice(cashBalance.totalAmount)}`)
        .text(`Total Efectivo: ${formatPrice(cashBalance.newCashAmount)}`);

      printer.align(ALIGN.CT).text(FONT_SIZE_SMALL).text('Sin validez fiscal');

      // close printer
      printer.cut().close();
    });
  } catch (error) {
    console.log(error);
    if (error.includes('Can not find printer')) {
      console.log('Error: Can not find printer');
    }
  }
}

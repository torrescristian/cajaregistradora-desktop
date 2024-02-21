import escpos from 'escpos';
import escposUSB from 'escpos-usb';

import {
  formatPrice,
  parseDateToArgentinianFormat,
  parseDateToTime,
} from '../helpers/utils';
import { ALIGN, FONT_SIZE_NORMAL, FONT_SIZE_SMALL } from '../helpers/const';
import { ITicket, PAYMENT_TYPE } from '../interfaces/ITicket';
import { ICashBalance } from '../interfaces/ICashBalance';
import { IExpense } from '../interfaces/IExpense';

interface ITotalByType {
  [type: string]: { [payment: string]: number };
}

interface IProps {
  totalByType: ITotalByType;
  tickets: ITicket[];
  cashBalance: ICashBalance;
  refundedTickets: ITicket[];
  expenses: IExpense[];
}

function getPaymentText(paymentType: PAYMENT_TYPE) {
  switch (paymentType) {
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
  totalByType,
}: IProps) {
  console.log(JSON.stringify(tickets, null, 2));
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

      // open & set printer
      printer.text(FONT_SIZE_NORMAL).text(firstTicket.store.name);

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
          .align(ALIGN.RT);

        for (const payment of ticket.payments) {
          printer.text(
            `Pago ${getPaymentText(payment.type)} ${formatPrice(
              Number(payment.amount),
            )}`,
          );
        }
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

      // Iterate over product types and payment types
      printer.align(ALIGN.LT).drawLine().text('Ganancias por Categoria');

      for (const type in totalByType) {
        printer.align(ALIGN.LT).text(type).align(ALIGN.RT);

        const totalsByPaymentType = totalByType[type];
        if (totalsByPaymentType[PAYMENT_TYPE.CASH]) {
          printer.text(
            `Efectivo: ${formatPrice(totalsByPaymentType[PAYMENT_TYPE.CASH])}`,
          );
        }
        if (
          totalsByPaymentType[PAYMENT_TYPE.DEBIT] ||
          totalsByPaymentType[PAYMENT_TYPE.CREDIT]
        ) {
          printer.text(
            `Virtual: ${formatPrice(
              (totalsByPaymentType[PAYMENT_TYPE.DEBIT] || 0) +
                (totalsByPaymentType[PAYMENT_TYPE.CREDIT] || 0),
            )}`,
          );
        }
      }

      printer
        .drawLine()
        .align(ALIGN.RT)
        .text(`Ganancia Diaria: ${formatPrice(cashBalance.totalAmount)}`)
        .text(`Ganancia Virtual: ${formatPrice(cashBalance.digitalCashAmount)}`)
        .text(
          `Caja Inicial (Efvo): ${formatPrice(cashBalance.initialCashAmount)}`,
        )
        .align(ALIGN.LT)
        .text(`Caja Final (Efvo)`)
        .align(ALIGN.RT)
        .text(formatPrice(cashBalance.newCashAmount))
        .align(ALIGN.LT)
        .text(`Caja Final + Virtual`)
        .align(ALIGN.RT)
        .text(
          formatPrice(
            cashBalance.newCashAmount + cashBalance.digitalCashAmount,
          ),
        );

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

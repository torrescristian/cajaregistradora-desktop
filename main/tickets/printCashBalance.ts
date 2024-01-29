import escpos from 'escpos';
import escposUSB from 'escpos-usb';

import {
  formatPrice,
  parseDateToArgentinianFormat,
  parseDateToTime,
} from '../helpers/utils';
import {
  ALIGN,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
} from '../helpers/const';
import { ITicket, PAYMENT_TYPE } from '../interfaces/ITicket';
import { ICashBalance } from '../interfaces/ICashBalance';
import { IExpense } from '../interfaces/IExpense';

interface IProps {
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
}: IProps) {
  console.log(JSON.stringify(tickets, null, 2))
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
      printer
        .text(FONT_SIZE_NORMAL)
        .text(firstTicket.store.name)
        

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


      const totalByType = tickets.reduce((acc, ticket) => {
        ticket.order.items.forEach((item) => {
          const productTypeName = item.product.type.name;
          const price = item.selectedVariant.price * item.quantity;

          ticket.payments.forEach((payment) => {
            const paymentType = payment.type;

            if (!acc[productTypeName]) {
              acc[productTypeName] = {};
            }

            if (!acc[productTypeName][paymentType]) {
              acc[productTypeName][paymentType] = 0;
            }

            acc[productTypeName][paymentType] += price;
          });
        });

        return acc;
      }, {});

      // Iterate over product types and payment types
      printer
        .align(ALIGN.LT)
        .text('Ganancias por Categoria')
        .drawLine()


      for (const type in totalByType) {
        printer
          .align(ALIGN.LT)
          .text(type)
          .align(ALIGN.RT);

        const totalsByPaymentType = totalByType[type];
        for (const paymentType in totalsByPaymentType) {
          const totalAmount = totalsByPaymentType[paymentType];
          if (paymentType === PAYMENT_TYPE.CASH) {
            printer.text(`Efectivo: ${formatPrice(totalAmount)}`);
          }
          if (paymentType === PAYMENT_TYPE.DEBIT) {
            printer.text(`Debito: ${formatPrice(totalAmount)}`);
          }
          if (paymentType === PAYMENT_TYPE.CREDIT) {
            printer.text(`Credito: ${formatPrice(totalAmount)}`);
          }
        }
      }

      printer
        .drawLine()
        .align(ALIGN.RT)
        .text(`Caja Inicial (C.I): ${formatPrice(cashBalance.initialCashAmount)}`)
        .align(ALIGN.LT)
        .text(`Caja Efectivo (C.I-Gastos)`)
        .align(ALIGN.RT)
        .text(formatPrice(cashBalance.newCashAmount))
        .text(
          `Caja Virtual: ${formatPrice(
            cashBalance.totalAmount - cashBalance.newCashAmount - expenses.reduce((acc, curr) => acc + curr.amount,0),
          )}`,
        )
        .text(`Total: ${formatPrice(cashBalance.totalAmount)}`);

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

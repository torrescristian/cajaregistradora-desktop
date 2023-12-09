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
import { ITicket } from '../interfaces/ITicket';

export default function printCashBalance(tickets: ITicket[]) {
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
          .text(`ID ${ticket.id} - Hora ${parseDateToTime(ticket.createdAt)}`)
          .align(ALIGN.RT)
          .text(formatPrice(ticket.totalPrice));
      }

      printer
        .drawLine()
        .align(ALIGN.CT)
        .text(FONT_SIZE_SMALL)
        .text('Sin validez fiscal');

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

import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import {
  discountToString,
  formatPrice,
  parseDateToArgentinianFormat,
} from '../helpers/utils';
import {
  ALIGN,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
  FONT_SIZE_BIG,
} from '../helpers/const';
import { ITicket } from '../interfaces/ITicket';

export default function printInvoice(ticket: ITicket) {
  try {
    if (!ticket?.id || !ticket?.order?.id) {
      console.log('Missing Ticket', ticket);
      return;
    }

    const { order } = ticket;

    if (!escposUSB) return;

    escpos.USB = escposUSB;

    const connectedDevices = escpos.USB.findPrinter() as any[];
    if (!connectedDevices.length) return;

    const device = new escpos.USB();
    const options = { width: 32 };

    const printer = new escpos.Printer(device, options as any);

    device.open((error) => {
      if (error) {
        console.log({ error });
        return;
      }

      // open & set printer
      printer.drawLine();
      printer.text(FONT_SIZE_SMALL).text('https://cajaregistradora.app');

      // store, client and order data
      printer
        .text(FONT_SIZE_BIG)
        .text(ticket.store.name)
        .text(FONT_SIZE_NORMAL);

      printer
        .align(ALIGN.LT)
        .text(`Pedido # ${order.id!}`)
        .text(`Fecha: ${parseDateToArgentinianFormat(order.createdAt)}`);

      printer.text(FONT_SIZE_NORMAL);
      // total amount & status
      printer
        .align(ALIGN.RT)
        .text(`Subtotal: ${formatPrice(order.subtotalPrice)}`);

      if (ticket.couponDiscount) {
        printer.text(`Descuento de cupon: ${ticket.couponDiscount}`);
        printer.text(`Otros descuentos: ${discountToString(order.discount)}`);
      } else {
        printer.text(`Descuento: ${discountToString(order.discount)}`);
      }

      printer
        .text(`Total: ${formatPrice(ticket.totalPrice)}`)
        .drawLine()
        .align(ALIGN.CT)
        .text(FONT_SIZE_SMALL)
        .text('Sin validez fiscal');

      // close printer
      printer.cut().close();
    });
  } catch (error) {
    if (error.includes('Can not find printer')) {
      console.log('Error: Can not find printer');
    }
  }
}

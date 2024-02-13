import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import {
  discountToString,
  formatPrice,
  parseDateToArgentinianFormat,
} from '../helpers/utils';
import {
  ALIGN,
  FONT_SIZE_SMALL,
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
      printer.text(FONT_SIZE_SMALL).text('https://cajaregistradora.com.ar');

      // store, client and order data
      printer
        .text(FONT_SIZE_SMALL)
        .text(ticket.store.name)

      printer
        .align(ALIGN.LT)
        .text(`Pedido # ${order.id!}`)
        .text(`Fecha: ${parseDateToArgentinianFormat(order.createdAt)}`);

    // aditional details
    if (order.additionalDetails) {
      printer.println(`# ${order.additionalDetails}`);
    }

    // order items
    for (const item of order.items) {
      printer
        .align(ALIGN.LT)
        .text(`${item.product.name} - ${item.selectedVariant.name}`)
        .align(ALIGN.RT)
        .text(
          `${formatPrice(item.selectedVariant.price)} x ${
            item.quantity
          } = ${formatPrice(item.selectedVariant.price * item.quantity)}`,
        );
    }

    // promo items

    for (const { promo, selectedVariants } of order.promoItems) {
      printer.align('LT').println(`PROMO: ${promo.name}`);

      for (const variant of selectedVariants) {
        printer.println(`- ${variant.product.name} - ${variant.name}`);
      }

      printer.align('RT').println(formatPrice(promo.price));
    }

    // total amount & status
    printer
      .align(ALIGN.RT)
      .text(`Subtotal: ${formatPrice(order.subtotalPrice)}`);

    if (ticket.couponDiscount) {
      printer.text(`Descuento de cupon: ${ticket.couponDiscount}`);
      if (ticket.order.discount?.amount) {
        printer.text(`Otros descuentos: ${discountToString(order.discount)}`);
      }
    } else if (ticket.order.discount?.amount) {
      printer.text(`Descuento: ${discountToString(order.discount)}`);
    }

      printer
        .drawLine()
        .text(`Total: ${formatPrice(ticket.totalPrice)}`)
        .drawLine()
        .align(ALIGN.CT)
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

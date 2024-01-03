import escpos from 'escpos';
import escposUSB from 'escpos-usb';

import {
  discountToString,
  formatPrice,
  parseDateToArgentinianFormat,
} from '../helpers/utils';
import { ALIGN, FONT_SIZE_NORMAL, FONT_SIZE_SMALL } from '../helpers/const';
import { ITicket } from '../interfaces/ITicket';

export default function printOrder(ticket: ITicket) {
  try {
    const { order } = ticket;

    if (!order?.id) {
      console.log('Missing Order', order);
      return;
    }
    if (!escposUSB) throw new Error('No escpos USB found');

    escpos.USB = escposUSB;

    const connectedDevices = escpos.USB.findPrinter() as any[];
    if (!connectedDevices.length) throw new Error('No connected devices');

    let device: escpos.USB;
    const options = { width: 32 };
    let printer;
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
      printer.text(FONT_SIZE_SMALL).text('https://cajaregistradora.app');
      printer
        .align(ALIGN.LT)
        .text(`Pedido # ${order.id!}`)
        .text(order.store.name)
        .text(`Fecha: ${parseDateToArgentinianFormat(order.createdAt)}`);

      // aditional details
      if (order.additionalDetails) {
        printer.println(`# ${order.additionalDetails}`);
      }

      printer.text(FONT_SIZE_NORMAL);
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

      if (ticket.couponDiscount) {
        printer
          .align(ALIGN.RT)
          .text(FONT_SIZE_NORMAL)
          .text(`Subtotal: ${formatPrice(order.subtotalPrice)}`)
          .text(`Descuento de cupon: ${ticket.couponDiscount}`);
        if (ticket.order.discount?.amount) {
          printer.text(`Otros descuentos: ${discountToString(order.discount)}`);
        }
      } else if (ticket.order.discount?.amount) {
        printer
          .align(ALIGN.RT)
          .text(FONT_SIZE_NORMAL)
          .text(`Subtotal: ${formatPrice(order.subtotalPrice)}`)
          .text(`Descuento: ${discountToString(order.discount)}`);
      }
      printer
        .text(`Total: ${formatPrice(ticket.totalPrice)}`)
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

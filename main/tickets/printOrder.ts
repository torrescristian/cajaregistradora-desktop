import escpos from 'escpos';
import escposUSB from 'escpos-usb';

import { formatPrice, parseDateToArgentinianFormat } from '../helpers/utils';
import {
  ALIGN,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
  FONT_SIZE_BIG,
} from '../helpers/const';
import { IOrder, ORDER_STATUS } from '../interfaces/IOrder';

export default function printOrder(order: IOrder) {
  try {
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
        .text(FONT_SIZE_BIG)
        .text(`Pedido # ${order.id!}`)
        .text(FONT_SIZE_NORMAL);

      // store, client and order data
      printer.text(FONT_SIZE_NORMAL).align(ALIGN.LT).text(order.store.name);

      if (order.client?.name) {
        printer.text(`Cliente: ${order.client.name}`);
      }

      printer
        .text(`Fecha: ${parseDateToArgentinianFormat(order.createdAt)}`)
        .drawLine();

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
        printer.newLine().align('LT').println(`PROMO: ${promo.name}`);

        for (const variant of selectedVariants) {
          printer.println(`- ${variant.product.name} - ${variant.name}`);
        }

        printer.align('RT').println(formatPrice(promo.price));
      }

      printer.text(FONT_SIZE_NORMAL);
      // total amount & status
      printer
        .align('RT')
        .newLine()
        .text(`Total: ${formatPrice(order.subtotalPrice)}`)
        .drawLine()
        .align('LT')
        .text(
          `Pago: ${
            order.status === ORDER_STATUS.PENDING ? 'PENDIENTE' : 'ABONADO'
          }`,
        )
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

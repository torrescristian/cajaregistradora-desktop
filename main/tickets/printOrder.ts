import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import {
  discountToString,
  formatPrice,
  parseDateToArgentinianFormat,
} from '../helpers/utils';
import { DEFAULT_FONT_SIZE } from '../helpers/const';
import { IOrder, ORDER_STATUS } from '../interfaces/IOrder';

export default function printOrder(order: IOrder) {
  try {
    if (!order?.id || !order?.client?.name) {
      console.log('Missing Order', order);
      return;
    }
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
      printer.size(1, 1).text(`Pedido # ${order.id!}`).text(DEFAULT_FONT_SIZE);

      // store, client and order data
      printer
        .align('LT')
        .text(`Danko's`)
        .text(`Cliente: ${order.client.name}`)
        .text(`Hora: ${parseDateToArgentinianFormat(order.createdAt)}`)
        .drawLine();

      // aditional details
      if (order.additionalDetails) {
        printer.println(`# ${order.additionalDetails}`);
      }

      // order items
      for (const item of order.items) {
        printer
          .align('LT')
          .println(`${item.product.name} - ${item.selectedVariant.name}`)
          .align('RT')
          .println(
            `${formatPrice(item.selectedVariant.price)} x ${
              item.quantity
            } = ${formatPrice(item.selectedVariant.price * item.quantity)}`,
          );
      }

      // promo items
      for (const { promo, selectedVariants } of order.promoItems) {
        printer.align('LT').println(`PROMO: ${promo.name}`);

        for (const variant of selectedVariants) {
          printer
            .align('LT')
            .println(`- ${variant.product.name} - ${variant.name}`);
        }

        printer.align('RT').println(formatPrice(promo.price));
      }

      // total amount & status
      printer
        .align('RT')
        .newLine()
        .text(`Subtotal: ${formatPrice(order.subtotalPrice)}`)
        .text(`Descuento: ${discountToString(order.discount)}`)
        .text(`Total: ${formatPrice(order.totalPrice)}`)
        .drawLine()
        .align('LT')
        .text(
          `Pago: ${
            order.status === ORDER_STATUS.PENDING ? 'PENDIENTE' : 'COBRADO'
          }`,
        );

      // close printer
      printer.cut().close();
    });
  } catch (error) {
    if (error.includes('Can not find printer')) {
      console.log('Error: Can not find printer');
    }
  }
}

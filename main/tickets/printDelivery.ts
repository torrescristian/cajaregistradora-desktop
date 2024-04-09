import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import { formatPrice, parseDateToArgentinianFormat } from '../helpers/utils';
import { ALIGN, FONT_SIZE_NORMAL, FONT_SIZE_SMALL } from '../helpers/const';
import { IOrder } from '../interfaces/IOrder';

export default function printInvoice(order: IOrder) {
  try {
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
      printer.text(FONT_SIZE_SMALL).text(order.store!.name).align(ALIGN.LT);

      if (order.delivery?.id) {
        printer.text(
          `Domicilio: ${order.delivery.userAddress || order.client.address}`,
        );
      }

      if (order.table?.id) {
        printer
          .text(FONT_SIZE_NORMAL)
          .text(`Mesa: ${order.table.code}`)
          .text(FONT_SIZE_SMALL);
      }

      printer
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
      printer.drawLine().align(ALIGN.RT);

      printer
        .text(`Total: ${formatPrice(order.totalPrice)}`)
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

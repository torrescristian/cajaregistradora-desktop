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
import { IOrder, ORDER_STATUS } from '../interfaces/IOrder';

export default function printCommand(order: IOrder) {
  try {
    if (!order?.id) {
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
      printer.drawLine();
      printer
        .text(FONT_SIZE_BIG)
        .text(`Pedido # ${order.id!}`)
        .text(FONT_SIZE_NORMAL);

      // store, client and order data
      printer
        .text(`Fecha: ${parseDateToArgentinianFormat(order.createdAt)}`)
        .drawLine();

      // aditional details
      if (order.additionalDetails) {
        printer.newLine().println(`# ${order.additionalDetails}`);
      }

      interface IItem {
        productName: string;
        variantId: number;
        variantName: string;
        quantity: number;
      }

      const orderItems = order.items.reduce((acc, curr) => {
        return acc.concat({
          productName: curr.product.name,
          variantId: curr.selectedVariant.id,
          variantName: curr.selectedVariant.name,
          quantity: curr.quantity,
        } as IItem);
      }, [] as IItem[]);

      const promoItems = order.promoItems
        .flatMap(({ selectedVariants }) => selectedVariants)
        .reduce((acc, curr) => {
          const item = acc.find((v) => v.variantId === curr.id);

          if (item) {
            item.quantity += 1;
            return acc;
          }

          return acc.concat({
            productName: curr.product.name,
            variantId: curr.id,
            variantName: curr.name,
            quantity: 1,
          } as IItem);
        }, [] as IItem[]);

      const items = orderItems.concat(promoItems).reduce((acc, curr) => {
        const item = acc.find((v) => v.variantId === curr.variantId);

        if (item) {
          item.quantity += 1;
          return acc;
        }

        return acc.concat(curr);
      }, [] as IItem[]);

      printer.text(FONT_SIZE_BIG)

      // order items
      for (const item of items) {
        printer
          .align(ALIGN.LT)
          .text(`(${item.quantity}) ${item.productName}`)
          .align(ALIGN.RT)
          .text(`- ${item.variantName}`);
      }

      printer.text(FONT_SIZE_NORMAL);
      // total amount & status
      printer
        .drawLine()
        .align('LT')
        .text(
          `Pago: ${
            order.status === ORDER_STATUS.PENDING ? 'PENDIENTE' : 'ABONADO'
          }`,
        )
        .align(ALIGN.CT)
        .text(FONT_SIZE_SMALL);

      // close printer
      printer.cut().close();
    });
  } catch (error) {
    if (error.includes('Can not find printer')) {
      console.log('Error: Can not find printer');
    }
  }
}

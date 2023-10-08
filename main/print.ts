import { ICartItem } from '../renderer/interfaces/ICart';
import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import { formatPrice, parseDateToArgentinianFormat } from './helpers/utils';

interface IProps {
  items: ICartItem[];
  totalAmount: number;
  id: number;
  createdAt: string;
}

export default function print({ items, createdAt, id, totalAmount }: IProps) {
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
      printer.size(1, 1).text(`Pedido # ${id}`).text('\x1B\x21\x00');

      // store, client and order data
      printer
        .align('LT')
        .text(`Local: Danko's`)
        .text(`Cliente: Cristian Torres`)
        .text(`Hora: ${parseDateToArgentinianFormat(createdAt)}`)
        .drawLine();

      // order items
      for (const item of items) {
        printer
          .align('LT')
          .println(item.product.name)
          .align('RT')
          .println(
            `${formatPrice(item.selectedVariant.price)} x ${
              item.quantity
            } = ${formatPrice(item.selectedVariant.price * item.quantity)}`,
          );
      }

      // total amount & status
      printer
        .newLine()
        .text(`Subtotal: ${formatPrice(totalAmount)}`)
        .text(`Descuento: ${formatPrice(0)}`)
        .text(`Total: ${formatPrice(totalAmount)}`)
        .drawLine()
        .align('LT')
        .text(`Pago: PENDIENTE`);

      // close printer
      printer.cut().close();
    });
  } catch (error) {
    if (error.includes('Can not find printer')) {
      console.log('Error: Can not find printer');
    }
  }
}

import { ICoupon } from '@/interfaces/ICoupon';
import {
  convertToEmoji,
  formatPrice,
  parseDateToArgentinianFormat,
} from '@/libs/utils';
import { DataItem } from '../DataItem';
import { DISCOUNT_TYPE, IDiscount } from '@/interfaces/IOrder';
import { format } from 'path';
import { TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  coupon: ICoupon;
}

export default function Coupon({ coupon }: IProps) {
  function convertDiscount(discount: IDiscount) {
    switch (discount.type) {
      case DISCOUNT_TYPE.FIXED:
        return formatPrice(discount.amount);
      case DISCOUNT_TYPE.PERC:
        return ` ${discount.amount}%`;
      default:
        return '-';
    }
  }

  const handleCancelCupon = () => {};

  return (
    <section className="flex flex-col border-2 border-primary-content shrink-0 p-3 gap-4">
      <div className="flex flex-row  justify-between">
        <DataItem label={'CÓDIGO:'} value={coupon.code} />
        <button className="btn btn-error" onClick={handleCancelCupon}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <DataItem
        label="Descuento:"
        value={formatPrice(coupon.discount.amount)}
      />
      <DataItem
        label="Vencimiento:"
        value={parseDateToArgentinianFormat(coupon.dueDate)}
      />
      <DataItem
        label="tipo de descuento:"
        value={convertDiscount(coupon.discount)}
      />
      <DataItem label="Limite:" value={formatPrice(coupon.maxAmount)} />

      <DataItem
        label="Producto:"
        value={
          coupon.variant
            ? `${convertToEmoji(coupon.variant.product.type)} ${
                coupon.variant.product.name
              } ${coupon.variant.name}`
            : '-'
        }
      />

      <DataItem label="Uso restantes:" value={coupon.availableUses} />
    </section>
  );
}

import { ICoupon } from '@/modules/cupones/interfaces/ICoupon';
import {
  formatPrice,
  parseDateToArgentinianFormat,
} from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import { DISCOUNT_TYPE, IDiscount } from '@/modules/ordenes/interfaces/IOrder';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Card } from '@/modules/common/components/Card';
import useCancelCouponMutation from '@/modules/cupones/hooks/useCancelCouponMutation';

interface IProps {
  coupon: ICoupon;
}

export default function Coupon({ coupon }: IProps) {
  const cancelCouponMutation = useCancelCouponMutation();

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

  const handleCancelCupon = () => {
    cancelCouponMutation.mutate(coupon.id!);
  };

  return (
    <Card className="items-start gap-3">
      <div className="flex flex-row justify-between w-full sm:w-[20vw]">
        <DataItem
          label={'Código:'}
          value={coupon.code}
          className="sm:flex-col flex-row flex-wrap"
        />
        <button className="btn btn-error text-neutral-content" onClick={handleCancelCupon}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <DataItem
        label="Descuento:"
        value={formatPrice(coupon.discount.amount)}
        className="sm:flex-col flex-row flex-wrap"
      />
      <DataItem
        label="Vencimiento:"
        value={parseDateToArgentinianFormat(coupon.dueDate)}
        className="sm:flex-col flex-row flex-wrap"
      />
      <DataItem
        label="Tipo de descuento:"
        value={convertDiscount(coupon.discount)}
        className="sm:flex-col flex-row flex-wrap"
      />
      <DataItem
        label="Descuento máximo:"
        value={formatPrice(coupon.maxAmount)}
        className="sm:flex-col flex-row flex-wrap"
      />

      <DataItem
        label="Producto Asociado:"
        value={
          coupon.variant
            ? `${coupon.variant.product.type.emoji} ${coupon.variant.product.name} ${coupon.variant.name}`
            : '-'
        }
        className="sm:flex-col flex-row flex-wrap"
      />

      <DataItem
        className="sm:flex-col flex-row flex-wrap"
        label="Uso restantes:"
        value={coupon.availableUses}
      />
    </Card>
  );
}

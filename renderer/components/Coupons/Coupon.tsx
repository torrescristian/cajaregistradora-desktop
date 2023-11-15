import { ICoupon, ICouponPayload } from '@/interfaces/ICoupon';
import { formatPrice, parseDateToArgentinianFormat } from '@/libs/utils';
import { DataItem } from '../DataItem';
import { DISCOUNT_TYPE, IDiscount } from '@/interfaces/IOrder';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Card } from '../Card';
import useCancelCouponMutation from '@/hooks/services/useCancelCouponMutation';

interface IProps {
  coupon: ICoupon;
}

export default function Coupon({ coupon }: IProps) {
  const cancelCouponMutation = useCancelCouponMutation();

  function convertDiscount(discount: IDiscount) {
    switch (discount?.type) {
      case DISCOUNT_TYPE.FIXED:
        return formatPrice(discount?.amount);
      case DISCOUNT_TYPE.PERC:
        return ` ${discount?.amount}%`;
      default:
        return '-';
    }
  }

  const handleCancelCupon = () => {
    cancelCouponMutation.mutate(coupon.id!);
  };

  return (
    <Card className="items-start gap-3">
      <div className="flex flex-row justify-between w-full">
        <DataItem label={'Código:'} value={coupon.code} />
        <button className="btn btn-error" onClick={handleCancelCupon}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <DataItem
        label="Descuento:"
        value={formatPrice(coupon.discount?.amount)}
      />
      <DataItem
        label="Vencimiento:"
        value={parseDateToArgentinianFormat(coupon.dueDate)}
      />
      <DataItem
        label="Tipo de descuento:"
        value={convertDiscount(coupon.discount)}
      />
      <DataItem
        label="Descuento máximo:"
        value={formatPrice(coupon.maxAmount)}
      />

  {/*     <DataItem
        label="Producto Asociado:"
        value={
          coupon.variant
            ? `${coupon.variant.product.type.emoji} ${coupon.variant.product.name} ${coupon.variant.name}`
            : '-'
        }
      /> */}

      <DataItem label="Uso restantes:" value={coupon.availableUses} />
    </Card>
  );
}

import { TrashIcon } from '@heroicons/react/24/solid';
import useCancelCouponMutation from '../hooks/useCancelCouponMutation';

interface IProps {
  couponId: number;
}

export default function CancelCouponButton({ couponId }: IProps) {
  const cancelCouponMutation = useCancelCouponMutation();

  const handleCancelCupon = () => {
    cancelCouponMutation.mutate(couponId);
  };

  return (
    <button
      className="btn btn-error text-neutral-content"
      onClick={handleCancelCupon}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
}

import { ArrowUturnRightIcon } from '@heroicons/react/24/solid';

import { IOrder } from '../../interfaces/IOrder';
import useNextStepDeliveryMutation from '../../hooks/useNextStepDeliveryMutation';

interface IProps {
  order: IOrder;
}

export default function NextStepDeliveryButton({ order }: IProps) {
  const nextStepMutation = useNextStepDeliveryMutation();

  const handleClick = async () => {
    await nextStepMutation.mutateAsync(order);
  };

  return (
    <button
      className="btn btn-square btn-outline btn-info"
      onClick={handleClick}
    >
      <ArrowUturnRightIcon className="w-5 h-5 " />
    </button>
  );
}

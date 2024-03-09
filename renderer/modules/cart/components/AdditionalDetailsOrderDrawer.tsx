import ClientForm from './ClientForm';
import Loader from '@/modules/common/components/Loader';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import ValidateCoupon from '@/modules/ordenes/components/molecules/ValidateCoupon';
import { formatPrice } from '@/modules/common/libs/utils';
import { DataItem } from '@/modules/common/components/DataItem';
import 'react-toastify/dist/ReactToastify.css';
import Payments from '@/modules/ordenes/components/molecules/Payments';
import CustomToastContainer from '@/modules/common/components/CustomToastContainer';
import useAdditionalDetailsOrder from '../hooks/useAdditionalDetailsOrder';
import { IPromoItem } from '../interfaces/ICart';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { Divider } from './Sale/Sale.styles';
import {
  getOrderToUpdate,
  getIsOrderBeingUpdated,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface IProps {
  // FIXME: remove onsubmit
  onSubmit?: () => void;
  promoItems?: IPromoItem[];
}

export const AdditionalDetailsOrderDrawer = ({
  onSubmit,
  promoItems,
}: IProps) => {
  const order = useOrderStore(getOrderToUpdate)!;
  const {
    addClientId,
    additionalDetails,
    coupon,
    discountAmount,
    discountType,
    handleChangeAdditionalsDetails,
    handleCouponDiscountAmount,
    handleSubmit,
    orderMutation,
    paymentProps,
    setDiscountAmount,
    setDiscountType,
    subtotalPrice,
  } = useAdditionalDetailsOrder({
    onSubmit,
    order,
    promoItems,
  });

  const isOrderUpdate = useOrderStore(getIsOrderBeingUpdated);

  if (orderMutation.isLoading) {
    return <Loader />;
  }

  return (
    <section className="p-5 bg-base-100 text-base-content h-screen">
      <div className="flex flex-col w-full items-center whitespace-nowrap gap-5 pt-5">
        {isOrderUpdate ? (
          <button
            onClick={handleSubmit}
            className="btn btn-info btn-outline w-full"
          >
            Actualizar orden
          </button>
        ) : (
          <button
            className="btn btn-success btn-outline w-full"
            onClick={handleSubmit}
          >
            Crear Orden
          </button>
        )}
        <DataItem
          label="Total:"
          value={formatPrice(subtotalPrice)}
          defaultValue=""
          className="text-2xl flex flex-row"
        />
      </div>
      <ClientForm
        onSelect={(client) => addClientId(client?.id || null)}
        defaultClient={order?.client}
      />
      <CustomToastContainer />
      <section className="flex flex-col items-center">
        <div className="flex flex-col gap-5 ">
          <Divider className="mt-10 mb-5">Detalles adicionales</Divider>
          <input
            className="input input-bordered"
            value={additionalDetails}
            onChange={handleChangeAdditionalsDetails}
          />
          <DiscountTypeControl
            onChangeAmount={setDiscountAmount}
            onChangeType={setDiscountType}
            discountAmount={discountAmount}
            discountType={discountType}
          />
          <ValidateCoupon
            onChange={handleCouponDiscountAmount}
            subtotalPrice={order?.subtotalPrice! || subtotalPrice}
            coupon={coupon}
          />
          <Payments {...paymentProps} />
        </div>
      </section>
    </section>
  );
};
